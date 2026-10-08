import TaskItem from './TaskItem';

function TaskList({ tasks = [], onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return (
      <div className="no-tasks" data-testid="no-tasks">
        <p>No tasks found. Create your first task above.</p>
      </div>
    );
  }

  return (
    <div className="task-list" data-testid="task-list">
      <h2>Your Tasks ({tasks.length})</h2>

      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default TaskList;