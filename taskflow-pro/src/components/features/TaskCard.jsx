import React from 'react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../../utils/constants';
import { formatRelativeTime } from '../../utils/helpers';

const TaskCard = ({ task, onToggle, onDelete, onEdit }) => {
  const priorityColor = PRIORITY_COLORS[task.priority];

  return (
    <div className={`
      group
      bg-white dark:bg-gray-800
      rounded-xl shadow-md
      border-l-4 ${priorityColor.border}
      p-5
      transition-all duration-300
      hover:shadow-xl hover:scale-[1.02]
      ${task.completed ? 'opacity-75' : ''}
    `}>
      <div className="flex items-start gap-4">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-6 h-6 mt-1 text-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500 cursor-pointer transition-transform hover:scale-110"
        />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className={`
              text-lg font-bold
              ${task.completed 
                ? 'line-through text-gray-500 dark:text-gray-400' 
                : 'text-gray-900 dark:text-white'
              }
            `}>
              {task.title}
            </h3>
            <Badge variant={task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'success'} size="sm">
              {PRIORITY_LABELS[task.priority]}
            </Badge>
          </div>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {task.description}
            </p>
          )}

          {task.tags && task.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {task.tags.map((tag, index) => (
                <Badge key={index} variant="default" size="sm">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatRelativeTime(task.createdAt)}
            </span>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  icon="✏️"
                >
                  Edit
                </Button>
              )}
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(task.id)}
                icon="🗑️"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;