import React from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const isOverdue =
    task.status === "Pending" && new Date(task.dueDate) < new Date().setHours(0, 0, 0, 0);

  return (
    <div className={"task-item" + (task.status === "Completed" ? " completed" : "")}>
      <input
        type="checkbox"
        checked={task.status === "Completed"}
        onChange={() => onToggle(task)}
      />
      <div className="task-item-body">
        <div className="task-item-title">{task.title}</div>
        <div className="task-item-meta">
          {task.subject && <span className="badge badge-subject">{task.subject.name}</span>}
          <span className={`badge badge-priority priority-${task.priority?.toLowerCase()}`}>
            {task.priority}
          </span>
          <span className={"badge badge-date" + (isOverdue ? " overdue" : "")}>
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className="task-item-actions">
        <button className="icon-btn" onClick={() => onEdit(task)} title="Edit">✏️</button>
        <button className="icon-btn danger" onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
      </div>
    </div>
  );
}

export default TaskItem;
