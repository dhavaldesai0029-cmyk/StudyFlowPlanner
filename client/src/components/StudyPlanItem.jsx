import React from "react";

function StudyPlanItem({ plan, onEdit, onDelete }) {
  return (
    <div className="plan-item">
      <div className="plan-time">
        <div>{plan.startTime} - {plan.endTime}</div>
        <div className="plan-date">{new Date(plan.date).toLocaleDateString()}</div>
      </div>
      <div className="plan-body">
        <div className="plan-topic">{plan.topic}</div>
        <div className="plan-meta">
          {plan.subject && <span className="badge badge-subject">{plan.subject.name}</span>}
          <span className={`badge badge-priority priority-${plan.priority?.toLowerCase()}`}>{plan.priority}</span>
          <span className={`badge status-${plan.status?.toLowerCase()}`}>{plan.status}</span>
        </div>
        {plan.notes && <p className="plan-notes">{plan.notes}</p>}
      </div>
      <div className="task-item-actions">
        <button className="icon-btn" onClick={() => onEdit(plan)} title="Edit">✏️</button>
        <button className="icon-btn danger" onClick={() => onDelete(plan._id)} title="Delete">🗑️</button>
      </div>
    </div>
  );
}

export default StudyPlanItem;
