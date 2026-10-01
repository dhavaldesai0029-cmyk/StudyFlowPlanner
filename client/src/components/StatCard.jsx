import React from "react";

function StatCard({ icon, label, value, accent }) {
  return (
    <div className="stat-card" style={{ borderTopColor: accent || "#4f46e5" }}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default StatCard;
