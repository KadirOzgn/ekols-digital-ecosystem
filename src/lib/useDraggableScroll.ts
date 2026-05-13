import { useState, useRef, useCallback } from 'react';

export const useDraggableScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftInitial = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeftInitial.current = ref.current.scrollLeft;
    
    // Temporarily disable snap during drag for smoother experience
    ref.current.style.scrollSnapType = 'none';
    ref.current.style.scrollBehavior = 'auto';
  }, [ref]);

  const onMouseLeave = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    setIsDragging(false);
    if (ref.current) {
      ref.current.style.scrollSnapType = 'x mandatory';
      ref.current.style.scrollBehavior = 'smooth';
    }
  }, [ref]);

  const onMouseUp = useCallback(() => {
    if (!isDown.current) return;
    isDown.current = false;
    // Delay resetting isDragging to prevent immediate click actions
    setTimeout(() => setIsDragging(false), 50);
    if (ref.current) {
      ref.current.style.scrollSnapType = 'x mandatory';
      ref.current.style.scrollBehavior = 'smooth';
    }
  }, [ref]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDown.current || !ref.current) return;
    e.preventDefault();
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Scroll speed multiplier
    
    if (Math.abs(walk) > 5) {
      setIsDragging(true);
    }
    
    ref.current.scrollLeft = scrollLeftInitial.current - walk;
  }, [ref]);

  return {
    onMouseDown,
    onMouseLeave,
    onMouseUp,
    onMouseMove,
    isDragging
  };
};
