import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  title, 
  subtitle, 
  gradient = false,
  hover = true,
  padding = 'default'
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  };

  return (
    <div className={`
      ${gradient 
        ? 'bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900' 
        : 'bg-white dark:bg-gray-800'
      }
      rounded-2xl shadow-xl
      transition-all duration-300
      ${hover ? 'hover:shadow-2xl hover:scale-[1.01]' : ''}
      border border-gray-100 dark:border-gray-700
      overflow-hidden
      ${className}
    `}>
      {title && (
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
          <h3 className="text-2xl font-bold gradient-text">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={paddings[padding]}>
        {children}
      </div>
    </div>
  );
};

export default Card;