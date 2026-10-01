import React from "react";

function About() {
  return (
    <div className="card about-card">
      <h2>About StudyFlow Planner</h2>
      <p>
        StudyFlow Planner is a Student Study Planning &amp; Task Management System built as part of
        the Silver Oak University BCA (Honours) Full Stack Development-I Experiential Learning
        Workbook. It helps students organize subjects, schedule study sessions, manage tasks, and
        track their overall study progress.
      </p>
      <h3>Technology Stack</h3>
      <ul>
        <li>Frontend: React.js, Vite, React Router, Axios</li>
        <li>Backend: Node.js, Express.js</li>
        <li>Database: MongoDB with Mongoose</li>
      </ul>
      <h3>Key Features</h3>
      <ul>
        <li>Dashboard with real-time study statistics</li>
        <li>Subject management with progress tracking</li>
        <li>Study planner for scheduling sessions</li>
        <li>Task management with priority and status filters</li>
        <li>Calendar view of daily schedules</li>
        <li>Overall progress tracking across subjects and tasks</li>
      </ul>
    </div>
  );
}

export default About;
