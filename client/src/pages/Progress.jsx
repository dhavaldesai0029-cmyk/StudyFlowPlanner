import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProgressBar from "../components/ProgressBar.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Progress() {
  const { subjects, tasks, loading } = useAppContext();

  const overallStats = useMemo(() => {
    const completed = tasks.filter((t) => t.status === "Completed").length;
    const pending = tasks.length - completed;
    const totalHours = subjects.reduce((sum, s) => sum + (s.totalStudyHours || 0), 0);
    const completedHours = subjects.reduce((sum, s) => sum + (s.completedStudyHours || 0), 0);
    return { completed, pending, totalHours, completedHours };
  }, [subjects, tasks]);

  if (loading && subjects.length === 0) return <Loader text="Loading progress..." />;

  return (
    <div>
      <div className="dashboard-grid">
        <div className="card">
          <h2>Tasks: Completed vs Pending</h2>
          <p>Completed: {overallStats.completed} &nbsp;|&nbsp; Pending: {overallStats.pending}</p>
          <ProgressBar
            percentage={
              tasks.length === 0 ? 0 : Math.round((overallStats.completed / tasks.length) * 100)
            }
          />
        </div>
        <div className="card">
          <h2>Total Study Hours</h2>
          <p>
            {overallStats.completedHours} / {overallStats.totalHours} hrs completed
          </p>
          <ProgressBar
            percentage={
              overallStats.totalHours === 0
                ? 0
                : Math.round((overallStats.completedHours / overallStats.totalHours) * 100)
            }
          />
        </div>
      </div>

      <div className="card">
        <h2>Subject-wise Progress</h2>
        {subjects.length === 0 ? (
          <EmptyState icon="📚" title="No subjects yet" />
        ) : (
          subjects.map((s) => (
            <div key={s._id} className="progress-row">
              <div className="progress-row-label">
                <span>{s.name}</span>
                <span>{s.progress || 0}%</span>
              </div>
              <ProgressBar percentage={s.progress || 0} color={s.color} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Progress;
