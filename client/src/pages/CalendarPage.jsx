import React, { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function formatDate(d) {
  return d.toISOString().substring(0, 10);
}

function CalendarPage() {
  const { studyPlans, fetchStudyPlans, loading } = useAppContext();
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date()));

  useEffect(() => {
    fetchStudyPlans({ date: selectedDate });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const grouped = useMemo(() => {
    const map = {};
    studyPlans.forEach((p) => {
      const key = p.date.substring(0, 10);
      if (!map[key]) map[key] = [];
      map[key].push(p);
    });
    return map;
  }, [studyPlans]);

  const todayKey = formatDate(new Date());

  return (
    <div>
      <div className="page-toolbar">
        <label>
          Select Date:{" "}
          <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
        </label>
        <button className="btn btn-secondary" onClick={() => setSelectedDate(todayKey)}>
          Today
        </button>
      </div>

      <div className="card">
        <h2>Schedule for {new Date(selectedDate).toLocaleDateString()}</h2>
        {loading ? (
          <Loader text="Loading schedule..." />
        ) : !grouped[selectedDate] || grouped[selectedDate].length === 0 ? (
          <EmptyState icon="📅" title="No study sessions planned" message="Add a study plan for this date from the Study Planner page." />
        ) : (
          <ul className="simple-list">
            {grouped[selectedDate]
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
              .map((plan) => (
                <li key={plan._id}>
                  <span>
                    {plan.startTime}-{plan.endTime} &middot; {plan.topic}{" "}
                    {plan.subject && <em>({plan.subject.name})</em>}
                  </span>
                  <span className={`badge status-${plan.status?.toLowerCase()}`}>{plan.status}</span>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CalendarPage;
