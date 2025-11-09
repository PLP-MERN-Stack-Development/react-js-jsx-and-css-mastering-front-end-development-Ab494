export const PRIORITY_COLORS = {
  high: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-300 dark:border-red-700',
    badge: 'bg-red-500'
  },
  medium: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-300',
    border: 'border-yellow-300 dark:border-yellow-700',
    badge: 'bg-yellow-500'
  },
  low: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-300 dark:border-green-700',
    badge: 'bg-green-500'
  }
};

export const PRIORITY_LABELS = {
  high: '🔴 High',
  medium: '🟡 Medium',
  low: '🟢 Low'
};

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All Tasks', icon: '📋' },
  { value: 'active', label: 'Active', icon: '⚡' },
  { value: 'completed', label: 'Completed', icon: '' },
  { value: 'high', label: 'High Priority', icon: '🔴' },
  { value: 'medium', label: 'Medium Priority', icon: '🟡' },
  { value: 'low', label: 'Low Priority', icon: '🟢' }
];

export const SORT_OPTIONS = [
  { value: 'date-desc', label: 'Newest First' },
  { value: 'date-asc', label: 'Oldest First' },
  { value: 'priority', label: 'Priority' },
  { value: 'name', label: 'Name (A-Z)' }
];

export const API_ENDPOINTS = {
  USERS: 'https://jsonplaceholder.typicode.com/users',
  POSTS: 'https://jsonplaceholder.typicode.com/posts',
  TODOS: 'https://jsonplaceholder.typicode.com/todos'
};

export const ITEMS_PER_PAGE = 9;

export const ANIMATION_DURATION = 300;

export const TOAST_DURATION = 3000;