import axios from 'axios';

// Helper function to retrieve auth token
const getAuthToken = () => localStorage.getItem('authToken'); // Adjust based on where you store the token

// Base URL for user-related API calls
const userApi = axios.create({
  baseURL: 'http://localhost:3000/user',
});

// Base URL for job-related API calls
const jobApi = axios.create({
  baseURL: 'http://localhost:3000/job',
});

// Interceptors to include Authorization header automatically
userApi.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

jobApi.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// User-related API calls
export const login = async (formData) => {
  try {
    return await userApi.post('/login', formData);
  } catch (error) {
    throw error.response ? error.response.data : new Error('An error occurred during login');
  }
};

export const fetchUsers = async () => {
  try {
    return await userApi.get('/getAll');
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch users');
  }
};

export const createUser = async (userData) => {
  try {
    return await userApi.post('/create', userData);
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create user');
  }
};

export const updateUser = async (email, userData) => {
  try {
    return await userApi.put(`/edit/${email}`, userData);
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to update user');
  }
};

// Job-related API calls
export const createJob = async (formData) => {
  try {
    return await jobApi.post('/create', formData);
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to create job');
  }
};

export const fetchJobs = async () => {
  try {
    return await jobApi.get('/get/jobs');
  } catch (error) {
    throw error.response ? error.response.data : new Error('Failed to fetch jobs');
  }
};
