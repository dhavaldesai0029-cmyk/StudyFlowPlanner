import React from "react";

function ProgressBar({ percentage = 0, color = "#4f46e5" }) {
  const safePercent = Math.min(100, Math.max(0, percentage));
  return (
    <div className="progress-bar-track">
      <div
        className="progress-bar-fill"
        style={{ width: `${safePercent}%`, backgroundColor: color }}
      ></div>
    </div>
  );
}

export default ProgressBar;
