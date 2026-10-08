import { useEffect, useState } from 'react';
import taskService from '../services/taskService';

const emptyTask = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
};

function TaskForm({ onTaskCreated, editingTask, onTaskUpdated, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyTask);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(editingTask ? { ...editingTask } : emptyTask);
    setError('');
  }, [editingTask]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setError('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setLoading(true);

    try {
      if (editingTask) {
        const result = await taskService.updateTask(editingTask._id, formData);
        onTaskUpdated(result.data);
      } else {
        const result = await taskService.createTask(formData);
        onTaskCreated(result.data);
      }

      setFormData(emptyTask);
      setError('');
    } catch (err) {
      const message = err.response?.data?.message;
      setError(Array.isArray(message) ? message.join(', ') : (message || 'An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>

      {error &&<div className="error-message" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="task-form" data-testid="task-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            maxLength={100}
            required
            data-testid="title-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            rows="3"
            maxLength={500}
            data-testid="description-input"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} data-testid="status-select">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority</label>
            <select id="priority" name="priority" value={formData.priority} onChange={handleChange} data-testid="priority-select">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading} data-testid="submit-button">
            {loading ? 'Saving...' : (editingTask ? 'Update Task' : 'Create Task')}
          </button>

          {editingTask && (
            <button type="button" onClick={onCancelEdit} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;