import { useEffect, useState } from 'react';
import Header from './components/Header';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import taskService from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const result = await taskService.getAllTasks();
        setTasks(result.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((current) => [newTask, ...current]);
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((current) =>
      current.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskService.deleteTask(id);
      setTasks((current) => current.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <TaskForm
          onTaskCreated={handleTaskCreated}
          editingTask={editingTask}
          onTaskUpdated={handleTaskUpdated}
          onCancelEdit={() => setEditingTask(null)}
        />

        <TaskList
          tasks={tasks}
          onEdit={setEditingTask}
          onDelete={handleDelete}
          loading={loading}
        />
      </main>

      <footer className="footer">
        <p>MERN Task Manager - DevOps Pipeline Project</p>
      </footer>
    </div>
  );
}

export default App;