import React from 'react';

const StatsCard = ({ title, value, icon, color = 'blue', trend }) => {
  const colors = {
    blue: 'from-blue-600 to-blue-700',
    purple: 'from-purple-600 to-purple-700',
    green: 'from-green-600 to-green-700',
    red: 'from-red-600 to-red-700',
    yellow: 'from-yellow-600 to-yellow-700',
    pink: 'from-pink-600 to-pink-700',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">
            {title}
          </p>
          <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </h3>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{trend.value}%</span>
              <span className="text-gray-500">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${colors[color]} flex items-center justify-center text-3xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;