import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = () => {
  return axios.get(API_URL);
};

export const createTask = (taskData) => {
  return axios.post(API_URL, taskData);
};

export const updateTask = (id, taskData) => {
  return axios.put(`${API_URL}/${id}`, taskData);
};

export const updateTaskStatus = (id, completed) => {
  return axios.patch(`${API_URL}/${id}/status`, { completed });
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const searchTasks = (keyword) => {
  return axios.get(`${API_URL}/search?q=${keyword}`);
};