import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import Card from '../components/ui/Card';
import StatsCard from '../components/features/StatsCard';
import { groupBy, calculatePercentage } from '../utils/helpers';

const Analytics = () => {
  const { tasks, getStats } = useTaskContext();
  const stats = getStats();

  const priorityBreakdown = {
    high: stats.high,
    medium: stats.medium,
    low: stats.low,
  };

  const completionRate = stats.total > 0 
    ? calculatePercentage(stats.completed, stats.total)
    : 0;

  const activeRate = stats.total > 0 
    ? calculatePercentage(stats.active, stats.total)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">
          Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Track your productivity and task completion insights
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
          icon="📋"
          color="blue"
        />
        <StatsCard
          title="Active Tasks"
          value={stats.active}
          icon="⚡"
          color="purple"
        />
        <StatsCard
          title="Completed"
          value={stats.completed}
          icon="✅"
          color="green"
        />
        <StatsCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon="📊"
          color="pink"
        />
      </div>

      {/* Priority Breakdown */}
      <Card title="Priority Distribution" gradient>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
            <div className="text-4xl mb-2">🔴</div>
            <h3 className="text-3xl font-bold text-red-600 dark:text-red-400 mb-1">
              {priorityBreakdown.high}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              High Priority Tasks
            </p>
            <div className="mt-4 bg-red-200 dark:bg-red-800 rounded-full h-2">
              <div
                className="bg-red-600 dark:bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (priorityBreakdown.high / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <div className="text-4xl mb-2">🟡</div>
            <h3 className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
              {priorityBreakdown.medium}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              Medium Priority Tasks
            </p>
            <div className="mt-4 bg-yellow-200 dark:bg-yellow-800 rounded-full h-2">
              <div
                className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (priorityBreakdown.medium / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div className="text-4xl mb-2">🟢</div>
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
              {priorityBreakdown.low}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold">
              Low Priority Tasks
            </p>
            <div className="mt-4 bg-green-200 dark:bg-green-800 rounded-full h-2">
              <div
                className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.total > 0 ? (priorityBreakdown.low / stats.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Task Completion Progress" gradient>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Completed Tasks
                </span>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">
                  {completionRate}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-green-600 to-green-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${completionRate}%` }}
                >
                  {completionRate > 10 && (
                    <span className="text-xs text-white font-bold">
                      {stats.completed}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Active Tasks
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  {activeRate}%
                </span>
              </div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                  style={{ width: `${activeRate}%` }}
                >
                  {activeRate > 10 && (
                    <span className="text-xs text-white font-bold">
                      {stats.active}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Productivity Insights" gradient>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl">
                  💪
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Keep Going!
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.active} tasks remaining
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center text-2xl">
                  🎯
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Great Progress
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.completed} tasks completed
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    Stay Focused
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {stats.high} high priority tasks
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card title="Quick Statistics" gradient>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📈</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {completionRate}%
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              Completion Rate
            </p>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.total}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              Total Tasks
            </p>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl mb-2">⏳</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.active}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              In Progress
            </p>
          </div>

          <div className="text-center p-4">
            <div className="text-3xl mb-2">✨</div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stats.completed}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-semibold">
              Completed
            </p>
          </div>
        </div>
      </Card>

      {/* Motivational Section */}
      {stats.completed > 0 && (
        <Card gradient>
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-3xl font-bold gradient-text mb-2">
              Amazing Work!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              You've completed {stats.completed} task{stats.completed !== 1 ? 's' : ''}! Keep up the great work!
            </p>
          </div>
        </Card>
      )}

      {stats.total === 0 && (
        <Card gradient>
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-3xl font-bold gradient-text mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
              Create your first task to see analytics and track your productivity!
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Analytics;