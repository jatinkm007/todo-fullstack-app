import axios from "axios";

// const API_URL =
//   import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

const API_URL = "https://todo-backend-w3n2.onrender.com/api/tasks";

function getMessage(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return "Server connection failed";
}

// I made this function because backend response can be different during testing.
// Sometimes it may be { tasks: [] } and sometimes { data: [] }.
function getTaskArray(responseData) {
  if (Array.isArray(responseData)) {
    return responseData;
  }

  if (Array.isArray(responseData.tasks)) {
    return responseData.tasks;
  }

  if (Array.isArray(responseData.data)) {
    return responseData.data;
  }

  return [];
}

export async function fetchTasks(searchText = "") {
  try {
    let url = API_URL;

    if (searchText.trim() !== "") {
      url = API_URL + "?search=" + encodeURIComponent(searchText);
    }

    const res = await axios.get(url);
    return getTaskArray(res.data);
  } catch (error) {
    throw new Error(getMessage(error));
  }
}

export async function addTask(task) {
  try {
    const res = await axios.post(API_URL, task);
    return res.data.task || res.data.data;
  } catch (error) {
    throw new Error(getMessage(error));
  }
}

export async function editTask(id, task) {
  try {
    const res = await axios.put(API_URL + "/" + id, task);
    return res.data.task || res.data.data;
  } catch (error) {
    throw new Error(getMessage(error));
  }
}

export async function toggleTaskStatus(id, completed) {
  try {
    const res = await axios.patch(API_URL + "/" + id + "/status", {
      completed: completed
    });

    return res.data.task || res.data.data;
  } catch (error) {
    throw new Error(getMessage(error));
  }
}

export async function removeTask(id) {
  try {
    await axios.delete(API_URL + "/" + id);
  } catch (error) {
    throw new Error(getMessage(error));
  }
}



// const API_URL = "https://todo-backend-w3n2.onrender.com/api/tasks";