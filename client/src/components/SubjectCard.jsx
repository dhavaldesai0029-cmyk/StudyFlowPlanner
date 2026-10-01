import React from "react";
import ProgressBar from "./ProgressBar.jsx";

function SubjectCard({ subject, onEdit, onDelete }) {
  return (
    <div className="subject-card" style={{ borderLeftColor: subject.color || "#4f46e5" }}>
      <div className="subject-card-header">
        <div>
          <h3>{subject.name}</h3>
          <span className="subject-code">{subject.code}</span>
        </div>
        <div className="subject-actions">
          <button className="icon-btn" onClick={() => onEdit(subject)} title="Edit">✏️</button>
          <button className="icon-btn danger" onClick={() => onDelete(subject._id)} title="Delete">🗑️</button>
        </div>
      </div>
      <p className="subject-faculty">Faculty: {subject.facultyName}</p>
      <p className="subject-hours">
        Study Hours: {subject.completedStudyHours || 0} / {subject.totalStudyHours || 0} hrs
      </p>
      <ProgressBar percentage={subject.progress || 0} color={subject.color} />
      <div className="subject-progress-text">{subject.progress || 0}% complete</div>
    </div>
  );
}

export default SubjectCard;
