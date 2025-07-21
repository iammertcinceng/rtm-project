import React, { useState, useCallback, useRef } from 'react';
import { useInView } from 'framer-motion';
import SplineScene from './SplineScene';

const RobotSpline: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      if (!event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    });
  }, []);

  return (
    <div
      ref={ref}
      className="h-full w-full relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="absolute inset-0">
        <div className="w-full h-full relative overflow-hidden">
          {isInView && (
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RobotSpline;