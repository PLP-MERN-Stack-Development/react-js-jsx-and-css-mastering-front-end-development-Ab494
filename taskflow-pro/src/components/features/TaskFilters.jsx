import React from 'react';
import Button from '../ui/Button';
import { FILTER_OPTIONS } from '../../utils/constants';

const TaskFilters = ({ currentFilter, onFilterChange, stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {FILTER_OPTIONS.map(filter => {
        const count = stats[filter.value] !== undefined ? stats[filter.value] : stats.total;
        const isActive = currentFilter === filter.value;

        return (
          <Button
            key={filter.value}
            variant={isActive ? 'primary' : 'ghost'}
            size="md"
            onClick={() => onFilterChange(filter.value)}
            className="justify-start"
          >
            <span className="text-lg">{filter.icon}</span>
            <div className="flex-1 text-left">
              <div className="font-semibold">{filter.label}</div>
              <div className="text-xs opacity-75">{count} tasks</div>
            </div>
          </Button>
        );
      })}
    </div>
  );
};

export default TaskFilters;