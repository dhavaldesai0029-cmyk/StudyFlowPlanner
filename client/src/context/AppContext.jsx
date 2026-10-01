import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [studyPlans, setStudyPlans] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ---- Subjects ----
  const fetchSubjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/subjects");
      setSubjects(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to load subjects. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  const addSubject = async (subjectData) => {
    const res = await api.post("/subjects", subjectData);
    setSubjects((prev) => [res.data.data, ...prev]);
  };

  const editSubject = async (id, subjectData) => {
    const res = await api.put(`/subjects/${id}`, subjectData);
    setSubjects((prev) => prev.map((s) => (s._id === id ? res.data.data : s)));
  };

  const removeSubject = async (id) => {
    await api.delete(`/subjects/${id}`);
    setSubjects((prev) => prev.filter((s) => s._id !== id));
  };

  // ---- Tasks ----
  const fetchTasks = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await api.get("/tasks", { params });
      setTasks(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    const res = await api.post("/tasks", taskData);
    setTasks((prev) => [res.data.data, ...prev]);
  };

  const editTask = async (id, taskData) => {
    const res = await api.put(`/tasks/${id}`, taskData);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
  };

  const removeTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleTaskStatus = async (task) => {
    const newStatus = task.status === "Completed" ? "Pending" : "Completed";
    await editTask(task._id, { status: newStatus });
  };

  // ---- Study Plans ----
  const fetchStudyPlans = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await api.get("/studyplans", { params });
      setStudyPlans(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to load study plans. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  const addStudyPlan = async (planData) => {
    const res = await api.post("/studyplans", planData);
    setStudyPlans((prev) => [res.data.data, ...prev]);
  };

  const editStudyPlan = async (id, planData) => {
    const res = await api.put(`/studyplans/${id}`, planData);
    setStudyPlans((prev) => prev.map((p) => (p._id === id ? res.data.data : p)));
  };

  const removeStudyPlan = async (id) => {
    await api.delete(`/studyplans/${id}`);
    setStudyPlans((prev) => prev.filter((p) => p._id !== id));
  };

  // ---- Dashboard ----
  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/dashboard");
      setDashboardStats(res.data.data);
      setError("");
    } catch (err) {
      setError("Failed to load dashboard. Is the backend server running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
    fetchTasks();
    fetchStudyPlans();
    fetchDashboardStats();
  }, [fetchSubjects, fetchTasks, fetchStudyPlans, fetchDashboardStats]);

  const value = {
    subjects,
    tasks,
    studyPlans,
    dashboardStats,
    loading,
    error,
    fetchSubjects,
    addSubject,
    editSubject,
    removeSubject,
    fetchTasks,
    addTask,
    editTask,
    removeTask,
    toggleTaskStatus,
    fetchStudyPlans,
    addStudyPlan,
    editStudyPlan,
    removeStudyPlan,
    fetchDashboardStats,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
