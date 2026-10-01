import React, { useState } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import StudyPlanForm from "../components/StudyPlanForm.jsx";
import StudyPlanItem from "../components/StudyPlanItem.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function StudyPlanner() {
  const { studyPlans, subjects, loading, error, addStudyPlan, editStudyPlan, removeStudyPlan } =
    useAppContext();
  const [editingPlan, setEditingPlan] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = async (data) => {
    if (editingPlan) {
      await editStudyPlan(editingPlan._id, data);
      setEditingPlan(null);
    } else {
      await addStudyPlan(data);
    }
    setShowForm(false);
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this study plan?")) {
      await removeStudyPlan(id);
    }
  };

  return (
    <div>
      <div className="page-toolbar">
        <h2 className="section-heading">Your Study Plans</h2>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingPlan(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "+ Create Study Plan"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          {subjects.length === 0 ? (
            <EmptyState icon="📚" title="Add a subject first" message="You need at least one subject before creating a study plan." />
          ) : (
            <StudyPlanForm
              subjects={subjects}
              onSubmit={handleSubmit}
              editingPlan={editingPlan}
              onCancel={() => {
                setEditingPlan(null);
                setShowForm(false);
              }}
            />
          )}
        </div>
      )}

      {loading && studyPlans.length === 0 ? (
        <Loader text="Loading study plans..." />
      ) : error ? (
        <EmptyState icon="⚠️" title="Something went wrong" message={error} />
      ) : studyPlans.length === 0 ? (
        <EmptyState icon="📝" title="No study plans yet" message="Create your first study plan above." />
      ) : (
        <div className="card">
          {studyPlans.map((plan) => (
            <StudyPlanItem key={plan._id} plan={plan} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudyPlanner;
