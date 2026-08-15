export interface ImageAtomizerOptions {
  elementId?: string;
  width?: number;
  height?: number;
  particleGap?: number;
  particleSize?: number;
  offsetX?: number;
  offsetY?: number;
  monochrome?: boolean;
  monochromeColor?: string;
  mouseForce?: number;
  restless?: boolean;
  timeScale?: number;
  onWidthChange?: (instance: ImageAtomizer, newWidth: number) => void;
  onHeightChange?: (instance: ImageAtomizer, newHeight: number) => void;
  onSizeChange?: (instance: ImageAtomizer, newWidth: number, newHeight: number) => void;
  onInitialized?: () => void;
  enablePerfLog?: boolean;
  perfLogInterval?: number;
  enableOffscreenWorker?: boolean;
  imageWidth?: number;
  imageHeight?: number;
}

export class ImageAtomizer {
  // Configurable options
  public elementId = "image-atomizer";
  public width = 0;
  public height = 0;
  public particleGap = 0;
  public particleSize = 2;
  public offsetX = 0;
  public offsetY = 0;
  public monochrome = false;
  public monochromeColor = "#fff";
  public mouseForce = 4000;
  public restless = false;
  public timeScale = 1;
  public onWidthChange: ((instance: ImageAtomizer, newWidth: number) => void) | null = null;
  public onHeightChange: ((instance: ImageAtomizer, newHeight: number) => void) | null = null;
  public onSizeChange: ((instance: ImageAtomizer, newWidth: number, newHeight: number) => void) | null = null;
  public onInitialized: (() => void) | null = null;
  public enablePerfLog = false;
  public perfLogInterval = 120;
  public enableOffscreenWorker = false;
  public imageWidth = 0;
  public imageHeight = 0;

  // Internal state
  public isRunning = false;
  private rafId: number | null = null;
  private image: HTMLImageElement | null = null;
  private isImageLoaded = false;
  private imageData: ImageData | null = null;
  private imageDataWidth = 0;
  private imageDataHeight = 0;
  private imageData32: Uint32Array | null = null;
  private isLittleEndian: boolean | null = null;

  private $container: HTMLElement | null = null;
  private $canv: HTMLCanvasElement | null = null;
  private $srcCanv: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private srcCtx: CanvasRenderingContext2D | null = null;

  // Interaction coordinates
  private mx = -1;
  private my = -1;

  // Canvas dimensions
  private cw = 0;
  private ch = 0;

  // Animation states
  private frame = 0;
  private hasInitialized = false;
  private lastTimestamp: number | null = null;
  private baseFrameDuration = 1000 / 60;
  private dampingFactor = 0.90;

  // Performance logging
  private perfFrameCount = 0;
  private perfAccumulatedMs = 0;
  private perfAccumulatedDrawMs = 0;
  private perfLastLog: number | null = null;

  // Particle buffer arrays (Struct-of-Arrays)
  private capacity = 0;
  private activeCount = 0;
  private posX = new Float32Array(0);
  private posY = new Float32Array(0);
  private velX = new Float32Array(0);
  private velY = new Float32Array(0);
  private gravityX = new Float32Array(0);
  private gravityY = new Float32Array(0);
  private ttl = new Float32Array(0);
  private colorPacked = new Uint32Array(0);
  private colorIsFunc = new Uint8Array(0);
  private colorFuncs: (((...args: any[]) => number[]) | null)[] = [];

  private monochromeColorArr: number[] | null = null;

  constructor(imageSrc: string, options?: ImageAtomizerOptions) {
    this.nextFrame = this.nextFrame.bind(this);

    // Apply custom options
    if (options) {
      const optionKeys: (keyof ImageAtomizerOptions)[] = [
        'elementId', 'width', 'height', 'particleGap', 'particleSize', 'monochrome', 'monochromeColor',
        'mouseForce', 'restless', 'onWidthChange', 'onHeightChange', 'onSizeChange', 'onInitialized',
        'offsetX', 'offsetY', 'timeScale', 'enablePerfLog', 'perfLogInterval', 'enableOffscreenWorker',
        'imageWidth', 'imageHeight'
      ];

      for (let i = 0; i < optionKeys.length; i++) {
        const key = optionKeys[i];
        if (options[key] !== undefined) {
          (this as any)[key] = options[key];
        }
      }
    }

    this.isLittleEndian = this.detectLittleEndian();
    if (!this.isLittleEndian) {
      console.warn("ImageAtomizer: Packed draw path expects little-endian byte order.");
    }

    // DOM elements
    this.$container = document.getElementById(this.elementId);
    if (!this.$container) {
      console.error(`ImageAtomizer: Container element with id "${this.elementId}" not found.`);
      return;
    }
    
    this.$canv = this.$container.querySelector("canvas.atomizer");
    if (!this.$canv) {
      console.error("ImageAtomizer: Canvas element with class 'atomizer' not found.");
      return;
    }

    // Source canvas for pixel readings
    this.$srcCanv = document.createElement("canvas");
    this.$srcCanv.style.display = "none";
    this.$container.appendChild(this.$srcCanv);

    // Set dimensions if not specified
    if (this.width <= 0) {
      this.width = this.$container.clientWidth || 300;
    }
    if (this.height <= 0) {
      this.height = this.$container.clientHeight || 300;
    }

    this.monochromeColorArr = this.parseColor(this.monochromeColor);

    // Canvas dimensions
    this.cw = this.getCanvasWidth();
    this.ch = this.getCanvasHeight();

    this.ctx = this.$canv.getContext("2d");
    this.srcCtx = this.$srcCanv.getContext("2d", { willReadFrequently: true });

    // Set canvas dimensions
    this.$canv.width = this.cw;
    this.$canv.height = this.ch;

    // Setup mouse/touch event listeners
    this.setupEvents();

    // Load initial image
    this.loadImage(imageSrc);
  }

  private setupEvents() {
    if (!this.$canv || !this.$container) return;

    const getOffset = (element: HTMLElement | string) => {
      let offsetLeft = 0;
      let offsetTop = 0;
      let targetElement = typeof element === "string" ? document.getElementById(element) : element;

      if (targetElement) {
        offsetLeft = targetElement.offsetLeft;
        offsetTop = targetElement.offsetTop;
        const body = document.getElementsByTagName("body")[0];

        while (targetElement.offsetParent && targetElement !== body) {
          offsetLeft += (targetElement.offsetParent as HTMLElement).offsetLeft;
          offsetTop += (targetElement.offsetParent as HTMLElement).offsetTop;
          targetElement = targetElement.offsetParent as HTMLElement;
        }
      }
      return { x: offsetLeft + this.offsetX, y: offsetTop + this.offsetY };
    };

    const supportsSwipeEvents = () => {
      return typeof window !== "undefined" && 'ontouchstart' in window;
    };

    this.$canv.onmouseout = () => {
      this.mx = -1;
      this.my = -1;
    };

    if (supportsSwipeEvents()) {
      const trackTouchCoordinates = (x: number, y: number) => {
        const offset = getOffset(this.$container!);
        this.mx = x - offset.x + window.scrollX;
        this.my = y - offset.y + window.scrollY;
      };
      
      this.$canv.ontouchstart = (event) => {
        trackTouchCoordinates(event.touches[0].clientX, event.touches[0].clientY);
      };
      this.$canv.ontouchmove = (event) => {
        trackTouchCoordinates(event.touches[0].clientX, event.touches[0].clientY);
      };
      this.$canv.ontouchend = () => {
        this.mx = -1;
        this.my = -1;
      };
    } else {
      this.$canv.onmousemove = (event) => {
        const offset = getOffset(this.$container!);
        this.mx = event.clientX - offset.x + window.scrollX;
        this.my = event.clientY - offset.y + window.scrollY;
      };
    }
  }

  private shuffle(array: any[]) {
    let temp, randomIndex;
    for (let i = 0, len = array.length; i < len; i++) {
      randomIndex = Math.floor(Math.random() * len);
      temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }

  public loadImage(imageSource: string) {
    this.image = new Image();
    this.isImageLoaded = false;

    if (imageSource) {
      this.image.src = imageSource;
      this.image.onload = () => {
        this.isImageLoaded = true;
        this.resize();
        this.play();
      };
      this.image.onerror = () => {
        console.error('ImageAtomizer: Failed to load the provided image source (%s). Please check the image exists.', imageSource);
      };
    } else {
      console.error('ImageAtomizer: You must provide an image source.');
    }
  }

  private packColor(color: number[]) {
    return ((color[3] & 0xff) << 24) | ((color[2] & 0xff) << 16) | ((color[1] & 0xff) << 8) | (color[0] & 0xff);
  }

  private detectLittleEndian() {
    const buffer = new ArrayBuffer(4);
    const view32 = new Uint32Array(buffer);
    const view8 = new Uint8Array(buffer);
    view32[0] = 0x0a0b0c0d;
    return view8[0] === 0x0d;
  }

  private parseColor(color: string): number[] | null {
    let result: any;
    color = color.replace(/\s+/g, "");

    if ((result = /^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/.exec(color))) {
      result = [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ];
    } else if ((result = /^#([\da-fA-F])([\da-fA-F])([\da-fA-F])/.exec(color))) {
      result = [
        parseInt(result[1], 16) * 17,
        parseInt(result[2], 16) * 17,
        parseInt(result[3], 16) * 17
      ];
    } else if ((result = /^rgba\(([\d]+),([\d]+),([\d]+),([\d]+|[\d]*\.[\d]+)\)/.exec(color))) {
      result = [+result[1], +result[2], +result[3], +result[4]];
    } else if ((result = /^rgb\(([\d]+),([\d]+),([\d]+)\)/.exec(color))) {
      result = [+result[1], +result[2], +result[3]];
    } else {
      return null;
    }

    if (isNaN(result[3])) {
      result[3] = 1;
    }
    result[3] *= 255;

    return result;
  }

  private ensureCapacity(required: number) {
    if (required <= this.capacity) {
      return;
    }
    const newCapacity = Math.max(required, this.capacity ? this.capacity * 2 : 256);
    const posX = new Float32Array(newCapacity);
    const posY = new Float32Array(newCapacity);
    const velX = new Float32Array(newCapacity);
    const velY = new Float32Array(newCapacity);
    const gravityX = new Float32Array(newCapacity);
    const gravityY = new Float32Array(newCapacity);
    const ttl = new Float32Array(newCapacity);
    const colorPacked = new Uint32Array(newCapacity);
    const colorIsFunc = new Uint8Array(newCapacity);
    const colorFuncs = new Array(newCapacity);

    posX.set(this.posX);
    posY.set(this.posY);
    velX.set(this.velX);
    velY.set(this.velY);
    gravityX.set(this.gravityX);
    gravityY.set(this.gravityY);
    ttl.set(this.ttl);
    colorPacked.set(this.colorPacked);
    colorIsFunc.set(this.colorIsFunc);
    for (let i = 0; i < this.colorFuncs.length; i++) {
      colorFuncs[i] = this.colorFuncs[i];
    }

    this.posX = posX;
    this.posY = posY;
    this.velX = velX;
    this.velY = velY;
    this.gravityX = gravityX;
    this.gravityY = gravityY;
    this.ttl = ttl;
    this.colorPacked = colorPacked;
    this.colorIsFunc = colorIsFunc;
    this.colorFuncs = colorFuncs;
    this.capacity = newCapacity;
  }

  public init() {
    if (this.isImageLoaded && this.image && this.$srcCanv && this.srcCtx) {
      const imgW = this.imageWidth > 0 ? this.imageWidth : this.image.width;
      const imgH = this.imageHeight > 0 ? this.imageHeight : this.image.height;

      this.$srcCanv.width = imgW;
      this.$srcCanv.height = imgH;
      this.srcCtx.clearRect(0, 0, imgW, imgH);
      this.srcCtx.drawImage(this.image, 0, 0, imgW, imgH);

      const pixels = this.getPixelFromImageData(
        this.srcCtx.getImageData(0, 0, imgW, imgH),
        ~~(this.cw / 2 - imgW / 2),
        ~~(this.ch / 2 - imgH / 2),
      );

      this.shuffle(pixels);

      const targetCount = pixels.length;
      const prevActive = this.activeCount;
      if (targetCount > this.capacity) {
        this.ensureCapacity(targetCount);
      }
      if (targetCount > prevActive) {
        for (let i = prevActive; i < targetCount; i++) {
          this.posX[i] = Math.random() * this.cw;
          this.posY[i] = Math.random() * this.ch;
          this.velX[i] = Math.random() * 10;
          this.velY[i] = Math.random() * 10;
          this.ttl[i] = -1;
          this.colorIsFunc[i] = 0;
          this.colorFuncs[i] = null;
        }
      }
      this.activeCount = Math.max(prevActive, targetCount);

      for (let i = 0; i < targetCount; i++) {
        const color = pixels[i].color;
        this.ttl[i] = -1;
        this.gravityX[i] = pixels[i].x;
        this.gravityY[i] = pixels[i].y;
        if (typeof color === "function") {
          this.colorIsFunc[i] = 1;
          this.colorFuncs[i] = color as any;
          const resolved = (color as any)();
          this.colorPacked[i] = resolved ? this.packColor(resolved) : 0;
        } else {
          this.colorIsFunc[i] = 0;
          this.colorFuncs[i] = null;
          this.colorPacked[i] = this.packColor(color);
        }
      }

      for (let i = targetCount; i < this.activeCount; i++) {
        this.ttl[i] = ~~(Math.random() * 10);
        this.gravityY[i] = ~~(this.ch * Math.random());
        this.gravityX[i] = ~~(this.cw * Math.random());
      }
    }
    
    if (!this.hasInitialized && this.onInitialized) {
      this.onInitialized();
    }
    this.hasInitialized = true;
  }

  private getPixelFromImageData(imageData: ImageData, offsetX: number, offsetY: number) {
    const pixels = [];
    const step = this.particleGap + this.particleSize;

    for (let x = 0; x < imageData.width; x += step) {
      for (let y = 0; y < imageData.height; y += step) {
        const pixelIndex = (y * imageData.width + x) * 4;
        const alpha = imageData.data[pixelIndex + 3];

        if (alpha > 0) {
          pixels.push({
            x: offsetX + x,
            y: offsetY + y,
            color: this.monochrome === true && this.monochromeColorArr
              ? [this.monochromeColorArr[0], this.monochromeColorArr[1], this.monochromeColorArr[2], this.monochromeColorArr[3]]
              : [imageData.data[pixelIndex], imageData.data[pixelIndex + 1], imageData.data[pixelIndex + 2], imageData.data[pixelIndex + 3]],
          });
        }
      }
    }

    return pixels;
  }

  public getCanvasWidth() {
    return this.$container ? this.$container.clientWidth : 0;
  }

  public getCanvasHeight() {
    return this.$container ? this.$container.clientHeight : 0;
  }

  public resize() {
    this.cw = this.getCanvasWidth();
    this.ch = this.getCanvasHeight();

    if (this.$canv) {
      this.$canv.width = this.cw;
      this.$canv.height = this.ch;
      this.imageData = null;
      this.imageDataWidth = 0;
      this.imageDataHeight = 0;
      this.imageData32 = null;
      this.init();
    }
  }

  public setImage(newImage: HTMLImageElement) {
    this.image = newImage;
    this.isImageLoaded = true;
    this.resize();
  }

  public setColor(color: string) {
    this.monochromeColorArr = this.parseColor(color);
  }

  public play() {
    if (this.isRunning) {
      return;
    }
    this.isRunning = true;
    this.lastTimestamp = null;
    this.rafId = this.requestAnimationFrame(this.nextFrame);
  }

  public pause() {
    if (!this.isRunning) {
      return;
    }
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.lastTimestamp = null;
  }

  public destroy() {
    this.pause();
    // remove dummy element
    if (this.$srcCanv && this.$srcCanv.parentNode) {
      this.$srcCanv.parentNode.removeChild(this.$srcCanv);
    }
  }

  private nextFrame(timestamp: number | DOMHighResTimeStamp) {
    if (!this.isRunning) {
      return;
    }
    if (typeof timestamp !== "number") {
      timestamp = performance.now();
    }
    if (this.lastTimestamp === null) {
      this.lastTimestamp = timestamp - this.baseFrameDuration;
    }
    const deltaMs = timestamp - this.lastTimestamp;
    this.lastTimestamp = timestamp;
    const timeStep = (deltaMs / this.baseFrameDuration) * this.timeScale;
    this.dampingFactor = Math.pow(0.90, timeStep);
    const frameStart = this.enablePerfLog ? performance.now() : 0;

    const posX = this.posX;
    const posY = this.posY;
    const velX = this.velX;
    const velY = this.velY;
    const gravityX = this.gravityX;
    const gravityY = this.gravityY;
    const ttl = this.ttl;
    const colorIsFunc = this.colorIsFunc;
    const mouseX = this.mx;
    const mouseY = this.my;
    const hasMouse = mouseX >= 0 && this.mouseForce;
    const baseForce = 0.008;
    let i = 0;

    while (i < this.activeCount) {
      if (ttl[i] >= 0) {
        ttl[i] -= timeStep;
        if (ttl[i] <= 0) {
          const last = this.activeCount - 1;
          if (i !== last) {
            posX[i] = posX[last];
            posY[i] = posY[last];
            velX[i] = velX[last];
            velY[i] = velY[last];
            gravityX[i] = gravityX[last];
            gravityY[i] = gravityY[last];
            ttl[i] = ttl[last];
            this.colorPacked[i] = this.colorPacked[last];
            colorIsFunc[i] = colorIsFunc[last];
            this.colorFuncs[i] = this.colorFuncs[last];
          }
          this.activeCount = last;
          continue;
        }
      }

      const dx = gravityX[i] - posX[i];
      const dy = gravityY[i] - posY[i];
      const distanceSq = dx * dx + dy * dy;
      let forceX = 0;
      let forceY = 0;

      if (this.restless === true) {
        const distance = Math.sqrt(distanceSq) || 1;
        const jitter = Math.random() * 0.1 - 0.05;
        const invDistance = 1 / distance;
        forceX = dx * baseForce + dx * invDistance * jitter;
        forceY = dy * baseForce + dy * invDistance * jitter;
      } else if (distanceSq < 1.5625) {
        posX[i] = gravityX[i] + 0.25;
        posY[i] = gravityY[i] + 0.25;
      }

      let mouseForce = 0;
      let mouseDx = 0;
      let mouseDy = 0;
      let mouseInvDistance = 0;
      let mouseScale = 1;

      if (hasMouse) {
        mouseDx = posX[i] - mouseX;
        mouseDy = posY[i] - mouseY;
        const mouseDistanceSq = mouseDx * mouseDx + mouseDy * mouseDy;
        if (mouseDistanceSq > 0.0001) {
          mouseForce = Math.min(this.mouseForce / mouseDistanceSq, this.mouseForce);
          mouseInvDistance = 1 / Math.sqrt(mouseDistanceSq);
        }
        if (colorIsFunc[i]) {
          mouseScale = -1;
          mouseForce *= 0.001 + Math.random() * 0.1 - 0.05;
        }
      }

      if (forceX === 0 && forceY === 0 && distanceSq >= 1.5625) {
        forceX = dx * baseForce;
        forceY = dy * baseForce;
      }
      if (mouseInvDistance > 0) {
        forceX += mouseForce * mouseScale * mouseDx * mouseInvDistance;
        forceY += mouseForce * mouseScale * mouseDy * mouseInvDistance;
      }

      velX[i] += forceX * timeStep;
      velY[i] += forceY * timeStep;
      velX[i] *= this.dampingFactor;
      velY[i] *= this.dampingFactor;
      posX[i] += velX[i];
      posY[i] += velY[i];
      i += 1;
    }

    const drawStart = this.enablePerfLog ? performance.now() : 0;
    this.drawParticles();
    const drawEnd = this.enablePerfLog ? performance.now() : 0;

    if (this.frame++ % 25 === 0 && (this.cw !== this.getCanvasWidth() || this.ch !== this.getCanvasHeight())) {
      const newWidth = this.getCanvasWidth();
      const newHeight = this.getCanvasHeight();

      if (this.cw !== newWidth && typeof this.onWidthChange === "function") {
        this.onWidthChange(this, newWidth);
      }
      if (this.ch !== newHeight && typeof this.onHeightChange === "function") {
        this.onHeightChange(this, newHeight);
      }
      if ((this.cw !== newWidth || this.ch !== newHeight) && typeof this.onSizeChange === "function") {
        this.onSizeChange(this, newWidth, newHeight);
      }
      this.resize();
    }

    if (this.enablePerfLog) {
      const frameEnd = performance.now();
      this.perfFrameCount += 1;
      this.perfAccumulatedMs += frameEnd - frameStart;
      this.perfAccumulatedDrawMs += drawEnd - drawStart;
      if (!this.perfLastLog) {
        this.perfLastLog = frameEnd;
      }
      if (this.perfFrameCount >= this.perfLogInterval) {
        const avgFrameMs = this.perfAccumulatedMs / this.perfFrameCount;
        const avgDrawMs = this.perfAccumulatedDrawMs / this.perfFrameCount;
        const fps = 1000 / avgFrameMs;
        console.log(
          "ImageAtomizer perf:",
          `frames=${this.perfFrameCount}`,
          `avgFrameMs=${avgFrameMs.toFixed(2)}`,
          `avgDrawMs=${avgDrawMs.toFixed(2)}`,
          `fps=${fps.toFixed(1)}`
        );
        this.perfFrameCount = 0;
        this.perfAccumulatedMs = 0;
        this.perfAccumulatedDrawMs = 0;
        this.perfLastLog = frameEnd;
      }
    }

    if (this.isRunning) {
      this.rafId = this.requestAnimationFrame(this.nextFrame);
    }
  }

  private drawParticles() {
    if (!this.ctx) return;

    if (!this.imageData || this.imageDataWidth !== this.cw || this.imageDataHeight !== this.ch) {
      this.imageData = this.ctx.createImageData(this.cw, this.ch);
      this.imageDataWidth = this.cw;
      this.imageDataHeight = this.ch;
      this.imageData32 = null;
    }
    
    const imageData = this.imageData;
    const data = imageData.data;
    if (!this.imageData32) {
      this.imageData32 = new Uint32Array(data.buffer, data.byteOffset, data.byteLength / 4);
    }
    
    const data32 = this.imageData32;
    data32.fill(0);
    let x, y, pixelX, pixelY;
    const posX = this.posX;
    const posY = this.posY;
    const colorPacked = this.colorPacked;

    for (let i = 0; i < this.activeCount; i++) {
      x = ~~posX[i];
      y = ~~posY[i];

      let startX = x;
      let startY = y;
      let endX = x + this.particleSize;
      let endY = y + this.particleSize;
      if (startX < 0) startX = 0;
      if (startY < 0) startY = 0;
      if (endX > this.cw) endX = this.cw;
      if (endY > this.ch) endY = this.ch;

      if (startX < endX && startY < endY) {
        const packed = colorPacked[i];
        const width = imageData.width;
        for (pixelY = startY; pixelY < endY; pixelY++) {
          let rowIndex = pixelY * width + startX;
          for (pixelX = startX; pixelX < endX; pixelX++) {
            data32[rowIndex++] = packed;
          }
        }
      }
    }

    this.ctx.putImageData(imageData, this.offsetX, this.offsetY);
  }

  private requestAnimationFrame(callback: FrameRequestCallback) {
    const requestAnimFrame = window.requestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      (window as any).oRequestAnimationFrame ||
      (window as any).msRequestAnimationFrame ||
      function (cb: FrameRequestCallback) {
        return window.setTimeout(cb, 1000 / 60);
      };
    return requestAnimFrame(callback);
  }
}
