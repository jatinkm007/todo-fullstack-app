import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

function getErrorMessage(error) {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }

  return "Something went wrong while connecting to server";
}

export async function fetchTasks(searchText = "") {
  try {
    let url = API_URL;

    if (searchText.trim() !== "") {
      url = API_URL + "?search=" + encodeURIComponent(searchText);
    }

    const res = await axios.get(url);
    return res.data.tasks;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function addTask(task) {
  try {
    const res = await axios.post(API_URL, task);
    return res.data.task;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function editTask(id, task) {
  try {
    const res = await axios.put(API_URL + "/" + id, task);
    return res.data.task;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function toggleTaskStatus(id, completed) {
  try {
    const res = await axios.patch(API_URL + "/" + id + "/status", {
      completed: completed
    });

    return res.data.task;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}

export async function removeTask(id) {
  try {
    await axios.delete(API_URL + "/" + id);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}




// const API_URL = "https://todo-backend-w3n2.onrender.com/api/tasks";