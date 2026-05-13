'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsEvent {
  type: 'click' | 'scroll' | 'move';
  x?: number;
  y?: number;
  scrollDepth?: number;
  path: string;
  timestamp: number;
  screenSize: {
    width: number;
    height: number;
  };
}

export const UserTracker = () => {
  const pathname = usePathname();
  const eventQueue = useRef<AnalyticsEvent[]>([]);
  const lastMoveTime = useRef<number>(0);

  const flushEvents = async () => {
    if (eventQueue.current.length === 0) return;

    const events = [...eventQueue.current];
    eventQueue.current = [];

    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(events),
        keepalive: true, // Important for sending data on page unload
      });
    } catch (error) {
      console.error('Analytics failed:', error);
      // Put events back if failed? Maybe not to avoid infinite loops
    }
  };

  useEffect(() => {
    const handleInterval = setInterval(flushEvents, 10000); // Flush every 10s

    const handleClick = (e: MouseEvent) => {
      eventQueue.current.push({
        type: 'click',
        x: e.pageX,
        y: e.pageY,
        path: pathname,
        timestamp: Date.now(),
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    };

    const handleScroll = () => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      // Only record scroll if it's significant or every few seconds
      const lastEvent = eventQueue.current.findLast(e => e.type === 'scroll');
      if (!lastEvent || Math.abs(lastEvent.scrollDepth! - scrollDepth) > 5) {
        eventQueue.current.push({
          type: 'scroll',
          scrollDepth,
          path: pathname,
          timestamp: Date.now(),
          screenSize: {
            width: window.innerWidth,
            height: window.innerHeight,
          },
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMoveTime.current < 500) return; // Sample every 500ms
      lastMoveTime.current = now;

      eventQueue.current.push({
        type: 'move',
        x: e.pageX,
        y: e.pageY,
        path: pathname,
        timestamp: now,
        screenSize: {
          width: window.innerWidth,
          height: window.innerHeight,
        },
      });
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('beforeunload', flushEvents);

    return () => {
      clearInterval(handleInterval);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('beforeunload', flushEvents);
      flushEvents(); // Final flush on unmount
    };
  }, [pathname]);

  return null;
};
