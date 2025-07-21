import React, { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ children, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Keep observing so we can animate on scroll up/down if needed
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = ref.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className || ''} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-700 ease-out`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimation;
