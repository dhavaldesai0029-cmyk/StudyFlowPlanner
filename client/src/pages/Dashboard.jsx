import React, { useMemo } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import StatCard from "../components/StatCard.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Dashboard() {
  const { dashboardStats, subjects, loading, error } = useAppContext();

  const topSubjects = useMemo(() => {
    return [...subjects].sort((a, b) => (b.progress || 0) - (a.progress || 0)).slice(0, 4);
  }, [subjects]);

  if (loading && !dashboardStats) return <Loader text="Loading dashboard..." />;
  if (error) return <EmptyState icon="⚠️" title="Something went wrong" message={error} />;
  if (!dashboardStats) return <EmptyState title="No data yet" message="Add a subject or task to get started." />;

  return (
    <div>
      <div className="stats-grid">
        <StatCard icon="📚" label="Total Subjects" value={dashboardStats.totalSubjects} accent="#4f46e5" />
        <StatCard icon="🗒️" label="Total Tasks" value={dashboardStats.totalTasks} accent="#0ea5e9" />
        <StatCard icon="✅" label="Completed Tasks" value={dashboardStats.completedTasks} accent="#22c55e" />
        <StatCard icon="⏳" label="Pending Tasks" value={dashboardStats.pendingTasks} accent="#f59e0b" />
        <StatCard icon="📆" label="Today's Tasks" value={dashboardStats.todaysTasks.length} accent="#ec4899" />
        <StatCard icon="📈" label="Study Progress" value={`${dashboardStats.progressPercentage}%`} accent="#8b5cf6" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <h2>Today's Tasks</h2>
          {dashboardStats.todaysTasks.length === 0 ? (
            <EmptyState icon="🎉" title="No tasks due today" />
          ) : (
            <ul className="simple-list">
              {dashboardStats.todaysTasks.map((task) => (
                <li key={task._id}>
                  <span>{task.title}</span>
                  <span className={`badge badge-priority priority-${task.priority?.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2>Top Subjects by Progress</h2>
          {topSubjects.length === 0 ? (
            <EmptyState icon="📚" title="No subjects added yet" />
          ) : (
            <ul className="simple-list">
              {topSubjects.map((s) => (
                <li key={s._id}>
                  <span>{s.name}</span>
                  <span>{s.progress || 0}%</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
