import React from "react";
import { useLocation } from "react-router-dom";

const titles = {
  "/": "Dashboard",
  "/subjects": "Subjects",
  "/planner": "Study Planner",
  "/tasks": "Tasks",
  "/calendar": "Calendar",
  "/progress": "Progress Tracking",
  "/about": "About",
};

function Navbar() {
  const location = useLocation();
  const title = titles[location.pathname] || "StudyFlow Planner";

  return (
    <header className="navbar">
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-sub">Student Study Planning &amp; Task Management System</div>
    </header>
  );
}

export default Navbar;
