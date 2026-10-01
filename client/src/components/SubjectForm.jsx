import React, { useState, useEffect } from "react";

const initialForm = {
  name: "",
  code: "",
  facultyName: "",
  totalStudyHours: "",
  completedStudyHours: "",
  progress: "",
  color: "#4f46e5",
};

function SubjectForm({ onSubmit, editingSubject, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingSubject) {
      setForm({
        name: editingSubject.name || "",
        code: editingSubject.code || "",
        facultyName: editingSubject.facultyName || "",
        totalStudyHours: editingSubject.totalStudyHours ?? "",
        completedStudyHours: editingSubject.completedStudyHours ?? "",
        progress: editingSubject.progress ?? "",
        color: editingSubject.color || "#4f46e5",
      });
    } else {
      setForm(initialForm);
    }
  }, [editingSubject]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Subject name is required";
    if (!form.code.trim()) newErrors.code = "Subject code is required";
    if (!form.facultyName.trim()) newErrors.facultyName = "Faculty name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      totalStudyHours: Number(form.totalStudyHours) || 0,
      completedStudyHours: Number(form.completedStudyHours) || 0,
      progress: Number(form.progress) || 0,
    });
    setForm(initialForm);
  };

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>Subject Name *</label>
        <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Data Structures" />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>
      <div className="form-row">
        <label>Subject Code *</label>
        <input name="code" value={form.code} onChange={handleChange} placeholder="e.g. CS201" />
        {errors.code && <span className="form-error">{errors.code}</span>}
      </div>
      <div className="form-row">
        <label>Faculty Name *</label>
        <input name="facultyName" value={form.facultyName} onChange={handleChange} placeholder="e.g. Prof. Sharma" />
        {errors.facultyName && <span className="form-error">{errors.facultyName}</span>}
      </div>
      <div className="form-row-inline">
        <div className="form-row">
          <label>Total Study Hours</label>
          <input type="number" min="0" name="totalStudyHours" value={form.totalStudyHours} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Completed Hours</label>
          <input type="number" min="0" name="completedStudyHours" value={form.completedStudyHours} onChange={handleChange} />
        </div>
      </div>
      <div className="form-row-inline">
        <div className="form-row">
          <label>Progress (%)</label>
          <input type="number" min="0" max="100" name="progress" value={form.progress} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Color</label>
          <input type="color" name="color" value={form.color} onChange={handleChange} />
        </div>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingSubject ? "Update Subject" : "Add Subject"}
        </button>
        {editingSubject && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default SubjectForm;
