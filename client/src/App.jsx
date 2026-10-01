import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Subjects from "./pages/Subjects.jsx";
import StudyPlanner from "./pages/StudyPlanner.jsx";
import Tasks from "./pages/Tasks.jsx";
import CalendarPage from "./pages/CalendarPage.jsx";
import Progress from "./pages/Progress.jsx";
import About from "./pages/About.jsx";

function App() {
  return (
    <AppProvider>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/subjects" element={<Subjects />} />
              <Route path="/planner" element={<StudyPlanner />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </AppProvider>
  );
}

export default App;
