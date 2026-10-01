import React from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "📊", end: true },
  { to: "/subjects", label: "Subjects", icon: "📚" },
  { to: "/planner", label: "Study Planner", icon: "📝" },
  { to: "/tasks", label: "Tasks", icon: "✅" },
  { to: "/calendar", label: "Calendar", icon: "📅" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/about", label: "About", icon: "ℹ️" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">🎯</span>
        <span className="brand-text">StudyFlow</span>
      </div>
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
          >
            <span className="sidebar-icon">{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
