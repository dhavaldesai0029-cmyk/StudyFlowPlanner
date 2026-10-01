import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import SubjectCard from "../components/SubjectCard.jsx";
import SubjectForm from "../components/SubjectForm.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Subjects() {
  const { subjects, loading, error, addSubject, editSubject, removeSubject } = useAppContext();
  const [editingSubject, setEditingSubject] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const filteredSubjects = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = async (data) => {
    if (editingSubject) {
      await editSubject(editingSubject._id, data);
      setEditingSubject(null);
    } else {
      await addSubject(data);
    }
    setShowForm(false);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this subject? Related tasks and study plans will also be removed.")) {
      await removeSubject(id);
    }
  };

  return (
    <div>
      <div className="page-toolbar">
        <input
          className="search-input"
          placeholder="Search subjects by name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingSubject(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "+ Add Subject"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <SubjectForm
            onSubmit={handleSubmit}
            editingSubject={editingSubject}
            onCancel={() => {
              setEditingSubject(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {loading && subjects.length === 0 ? (
        <Loader text="Loading subjects..." />
      ) : error ? (
        <EmptyState icon="⚠️" title="Something went wrong" message={error} />
      ) : filteredSubjects.length === 0 ? (
        <EmptyState icon="📚" title="No subjects found" message="Add your first subject to get started." />
      ) : (
        <div className="grid-cards">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              subject={subject}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Subjects;
