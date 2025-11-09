import { API_CONFIG, handleApiError } from './config';

const BASE_URL = API_CONFIG.BASE_URL;

export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: API_CONFIG.HEADERS,
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { data: null, error: handleApiError(error) };
  }
};

export const fetchUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user:', error);
    return { data: null, error: handleApiError(error) };
  }
};

export const fetchUserPosts = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching user posts:', error);
    return { data: null, error: handleApiError(error) };
  }
};

export const searchUsers = (users, searchTerm) => {
  if (!searchTerm) return users;
  
  const term = searchTerm.toLowerCase();
  return users.filter(user =>
    user.name.toLowerCase().includes(term) ||
    user.email.toLowerCase().includes(term) ||
    user.username.toLowerCase().includes(term) ||
    user.company.name.toLowerCase().includes(term)
  );
};