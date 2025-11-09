import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`
        ${sizes[size]}
        border-4 border-gray-200 dark:border-gray-700
        border-t-blue-600 dark:border-t-blue-400
        rounded-full
        animate-spin
      `} />
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
          {text}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;