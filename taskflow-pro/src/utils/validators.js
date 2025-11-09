export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateTaskTitle = (title) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Task title is required' };
  }
  if (title.length < 3) {
    return { valid: false, error: 'Task title must be at least 3 characters' };
  }
  if (title.length > 200) {
    return { valid: false, error: 'Task title must be less than 200 characters' };
  }
  return { valid: true, error: null };
};

export const validateTaskDescription = (description) => {
  if (description && description.length > 500) {
    return { valid: false, error: 'Description must be less than 500 characters' };
  }
  return { valid: true, error: null };
};

export const validatePriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
};