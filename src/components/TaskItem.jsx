function TaskItem({ task, onEdit, onDelete }) {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <article className="task-item" data-testid="task-item">
      <div className="task-header">
        <h3 data-testid="task-title">{task.title}</h3>

        <div className="task-badges">
          <span className={`badge priority-${task.priority}`}>{task.priority}</span>
          <span className={`badge status-${task.status}`}>{task.status}</span>
        </div>
      </div>

      {task.description && (
        <p className="task-description" data-testid="task-description">
          {task.description}
        </p>
      )}

      <div className="task-footer">
        <span className="task-date">Created: {formatDate(task.createdAt)}</span>

        <div className="task-actions">
          <button onClick={() => onEdit(task)} className="edit-button" data-testid="edit-button">
            Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="delete-button" data-testid="delete-button">
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskItem;