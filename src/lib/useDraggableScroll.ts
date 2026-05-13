import { useState, useRef, useCallback, useEffect } from 'react';

export const useDraggableScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftInitial = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!ref.current) return;
    isDown.current = true;
    startX.current = e.pageX - ref.current.offsetLeft;
    scrollLeftInitial.current = ref.current.scrollLeft;
    
    // Temporarily disable snap during drag
    ref.current.style.scrollSnapType = 'none';
    ref.current.style.scrollBehavior = 'auto';
    ref.current.style.cursor = 'grabbing';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown.current || !ref.current) return;
      
      const x = e.pageX - ref.current.offsetLeft;
      const walk = (x - startX.current) * 2;
      
      if (Math.abs(walk) > 5) {
        setIsDragging(true);
      }
      
      ref.current.scrollLeft = scrollLeftInitial.current - walk;
    };

    const handleMouseUp = () => {
      if (!isDown.current) return;
      isDown.current = false;
      
      setTimeout(() => setIsDragging(false), 50);
      
      if (ref.current) {
        ref.current.style.scrollSnapType = 'x mandatory';
        ref.current.style.scrollBehavior = 'smooth';
        ref.current.style.cursor = 'grab';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [ref]);

  return {
    onMouseDown: handleMouseDown,
    isDragging
  };
};
