import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

const UserCard = ({ user }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card hover={true} padding="default" className="h-full">
      <div className="flex flex-col h-full">
        {/* Avatar and Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg flex-shrink-0">
            {getInitials(user.name)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white truncate">
              {user.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              @{user.username}
            </p>
            <Badge variant="primary" size="sm" className="mt-1">
              ID: {user.id}
            </Badge>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">📧</span>
            <a 
              href={`mailto:${user.email}`}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate"
            >
              {user.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">📱</span>
            <span className="text-gray-700 dark:text-gray-300">
              {user.phone}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">🏢</span>
            <span className="text-gray-700 dark:text-gray-300 truncate">
              {user.company.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">🌐</span>
            <a 
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline truncate"
            >
              {user.website}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-lg">📍</span>
            <span className="text-gray-700 dark:text-gray-300 truncate">
              {user.address.city}, {user.address.street}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
            View Profile
          </button>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;