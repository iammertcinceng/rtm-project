import React, { Suspense, lazy, useEffect, useState } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

const SplineScene: React.FC<SplineSceneProps> = ({ scene, className }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="relative flex h-8 w-8">
            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></div>
            <div className="relative inline-flex rounded-full h-8 w-8 bg-pink-500"></div>
          </div>
        </div>
      }
    >
      <ErrorBoundary fallback={<div>Error loading 3D scene</div>}>
        {isVisible && (
          <div className={className}>
            <Spline scene={scene} />
          </div>
        )}
      </ErrorBoundary>
    </Suspense>
  );
};

interface ErrorBoundaryProps {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('SplineScene error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default SplineScene;