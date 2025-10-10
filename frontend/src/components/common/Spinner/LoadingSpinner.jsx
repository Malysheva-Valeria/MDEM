import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message, fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizeClasses[size]} text-primary-500 animate-spin`} />
      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      {spinnerContent}
    </div>
  );
};

export default LoadingSpinner;