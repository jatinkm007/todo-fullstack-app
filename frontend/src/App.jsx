import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  searchTasks
} from "./api/taskApi";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const res = await getTasks();
      setTasks(res.data.data);
    } catch (error) {
      setErrorMessage("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      await createTask(taskData);
      loadTasks();
    } catch (error) {
      alert("Task could not be added");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      alert("Task could not be deleted");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      await updateTaskStatus(task._id, !task.completed);
      loadTasks();
    } catch (error) {
      alert("Status could not be updated");
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);

      if (searchText.trim() === "") {
        loadTasks();
        return;
      }

      const res = await searchTasks(searchText);
      setTasks(res.data.data);
    } catch (error) {
      setErrorMessage("Search failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>To-Do List App</h1>
      <p>React frontend connected with Express and MongoDB backend</p>

      <TaskForm onAddTask={handleAddTask} />

      <div className="search-box">
        <input
          type="text"
          placeholder="Search task"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={loadTasks}>Show All</button>
      </div>

      {loading && <p>Loading tasks...</p>}

      {errorMessage && <p className="error">{errorMessage}</p>}

      {!loading && (
        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleStatus}
        />
      )}
    </div>
  );
}

export default App;