import React, { useState, useEffect } from "react";

const initialForm = {
  title: "",
  subject: "",
  description: "",
  dueDate: "",
  priority: "Medium",
  status: "Pending",
};

function TaskForm({ subjects, onSubmit, editingTask, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title || "",
        subject: editingTask.subject?._id || editingTask.subject || "",
        description: editingTask.description || "",
        dueDate: editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : "",
        priority: editingTask.priority || "Medium",
        status: editingTask.status || "Pending",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Task title is required";
    if (!form.dueDate) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = { ...form };
    if (!payload.subject) delete payload.subject;
    onSubmit(payload);
    setForm(initialForm);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Task Title *</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. Complete DBMS assignment" />
        {errors.title && <span className="form-error">{errors.title}</span>}
      </div>
      <div className="form-row">
        <label>Subject</label>
        <select name="subject" value={form.subject} onChange={handleChange}>
          <option value="">-- None --</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="2" />
      </div>
      <div className="form-row-inline">
        <div className="form-row">
          <label>Due Date *</label>
          <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
          {errors.dueDate && <span className="form-error">{errors.dueDate}</span>}
        </div>
        <div className="form-row">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
