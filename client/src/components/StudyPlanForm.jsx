import React, { useState, useEffect } from "react";

const initialForm = {
  subject: "",
  date: "",
  startTime: "",
  endTime: "",
  topic: "",
  priority: "Medium",
  notes: "",
  status: "Planned",
};

function StudyPlanForm({ subjects, onSubmit, editingPlan, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingPlan) {
      setForm({
        subject: editingPlan.subject?._id || editingPlan.subject || "",
        date: editingPlan.date ? editingPlan.date.substring(0, 10) : "",
        startTime: editingPlan.startTime || "",
        endTime: editingPlan.endTime || "",
        topic: editingPlan.topic || "",
        priority: editingPlan.priority || "Medium",
        notes: editingPlan.notes || "",
        status: editingPlan.status || "Planned",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingPlan]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.subject) newErrors.subject = "Please select a subject";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.startTime) newErrors.startTime = "Start time is required";
    if (!form.endTime) newErrors.endTime = "End time is required";
    if (!form.topic.trim()) newErrors.topic = "Topic is required";
    if (form.startTime && form.endTime && form.startTime >= form.endTime) {
      newErrors.endTime = "End time must be after start time";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Subject *</label>
        <select name="subject" value={form.subject} onChange={handleChange}>
          <option value="">-- Select Subject --</option>
          {subjects.map((s) => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
        {errors.subject && <span className="form-error">{errors.subject}</span>}
      </div>
      <div className="form-row">
        <label>Topic *</label>
        <input name="topic" value={form.topic} onChange={handleChange} placeholder="e.g. Binary Trees" />
        {errors.topic && <span className="form-error">{errors.topic}</span>}
      </div>
      <div className="form-row">
        <label>Date *</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} />
        {errors.date && <span className="form-error">{errors.date}</span>}
      </div>
      <div className="form-row-inline">
        <div className="form-row">
          <label>Start Time *</label>
          <input type="time" name="startTime" value={form.startTime} onChange={handleChange} />
          {errors.startTime && <span className="form-error">{errors.startTime}</span>}
        </div>
        <div className="form-row">
          <label>End Time *</label>
          <input type="time" name="endTime" value={form.endTime} onChange={handleChange} />
          {errors.endTime && <span className="form-error">{errors.endTime}</span>}
        </div>
      </div>
      <div className="form-row-inline">
        <div className="form-row">
          <label>Priority</label>
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-row">
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Planned</option>
            <option>Completed</option>
            <option>Missed</option>
          </select>
        </div>
      </div>
      <div className="form-row">
        <label>Notes</label>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows="2" />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingPlan ? "Update Plan" : "Add Study Plan"}
        </button>
        {editingPlan && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudyPlanForm;
