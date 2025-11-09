import React, { useState } from 'react';
import { useTaskContext } from '../context/TaskContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import TaskCard from '../components/features/TaskCard';
import TaskFilters from '../components/features/TaskFilters';
import StatsCard from '../components/features/StatsCard';
import { validateTaskTitle } from '../utils/validators';

const TaskManager = () => {
  const {
    filter,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
    getFilteredTasks,
    getStats,
  } = useTaskContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});

  const stats = getStats();
  const filteredTasks = getFilteredTasks();

  const handleAddTask = () => {
    const validation = validateTaskTitle(newTask.title);
    
    if (!validation.valid) {
      setErrors({ title: validation.error });
      return;
    }

    addTask(newTask);
    setNewTask({ title: '', description: '', priority: 'medium', tags: [] });
    setTagInput('');
    setErrors({});
    setIsModalOpen(false);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !newTask.tags.includes(tagInput.trim())) {
      setNewTask(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNewTask(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold gradient-text mb-4">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Organize your tasks efficiently and boost productivity
        </p>
      </div>

      {/* Stats Grid */}
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
          value={`${stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%`}
          icon="📊"
          color="pink"
        />
      </div>

      {/* Filters and Actions */}
      <Card>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <h2 className="text-2xl font-bold gradient-text">
              Your Tasks
            </h2>
            <div className="flex gap-3">
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                icon="➕"
              >
                Add New Task
              </Button>
              {stats.completed > 0 && (
                <Button
                  variant="danger"
                  onClick={clearCompleted}
                  icon="🗑️"
                >
                  Clear Completed
                </Button>
              )}
            </div>
          </div>

          <TaskFilters
            currentFilter={filter}
            onFilterChange={setFilter}
            stats={stats}
          />
        </div>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <Card>
            <div className="text-center py-16">
              <div className="text-6xl mb-4">
                {filter === 'completed' ? '🎉' : '📝'}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {filter === 'all' && 'No tasks yet'}
                {filter === 'active' && 'No active tasks'}
                {filter === 'completed' && 'No completed tasks yet'}
                {filter === 'high' && 'No high priority tasks'}
                {filter === 'medium' && 'No medium priority tasks'}
                {filter === 'low' && 'No low priority tasks'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {filter === 'all' && 'Create your first task to get started!'}
                {filter === 'active' && 'Great job! All tasks are completed.'}
                {filter === 'completed' && 'Complete some tasks to see them here.'}
              </p>
              <Button
                variant="primary"
                onClick={() => setIsModalOpen(true)}
                icon="➕"
              >
                Create Your First Task
              </Button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setErrors({});
        }}
        title="Create New Task"
        footer={
          <>
            <Button
              variant="ghost"
              onClick={() => {
                setIsModalOpen(false);
                setErrors({});
              }}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddTask}
              icon="✅"
            >
              Create Task
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Task Title *"
            placeholder="Enter task title..."
            value={newTask.title}
            onChange={(e) => {
              setNewTask(prev => ({ ...prev, title: e.target.value }));
              setErrors(prev => ({ ...prev, title: '' }));
            }}
            error={errors.title}
            icon="📝"
          />

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Add a description..."
              rows="3"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Priority
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['low', 'medium', 'high'].map(priority => (
                <button
                  key={priority}
                  onClick={() => setNewTask(prev => ({ ...prev, priority }))}
                  className={`
                    px-4 py-3 rounded-xl font-semibold transition-all duration-300
                    ${newTask.priority === priority
                      ? priority === 'high' 
                        ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
                        : priority === 'medium'
                        ? 'bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }
                  `}
                >
                  {priority === 'high' && '🔴 High'}
                  {priority === 'medium' && '🟡 Medium'}
                  {priority === 'low' && '🟢 Low'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add tags..."
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button variant="primary" onClick={handleAddTag} size="md">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newTask.tags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-semibold"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-600"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TaskManager;