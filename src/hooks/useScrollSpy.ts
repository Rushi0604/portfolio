import { useState, useEffect } from 'react';

export const useScrollSpy = (sectionIds: string[]): string => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      // Trigger when the section occupies the middle part of the screen
      rootMargin: '-30% 0px -30% 0px',
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection || sectionIds[0] || '';
};
