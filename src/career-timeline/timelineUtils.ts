/**
 * Clamps a number between min and max values.
 */
export const clamp = (val: number, min: number, max: number): number => {
  return Math.max(min, Math.min(max, val));
};

/**
 * Linearly interpolates between two values.
 */
export const lerp = (start: number, end: number, amt: number): number => {
  return (1 - amt) * start + amt * end;
};
