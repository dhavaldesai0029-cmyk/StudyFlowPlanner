import React, { useState, useEffect, useMemo } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import TaskItem from "../components/TaskItem.jsx";
import TaskForm from "../components/TaskForm.jsx";
import Loader from "../components/Loader.jsx";
import EmptyState from "../components/EmptyState.jsx";

function Tasks() {
  const { tasks, subjects, loading, error, fetchTasks, addTask, editTask, removeTask, toggleTaskStatus } =
    useAppContext();
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const params = {};
    if (statusFilter !== "All") params.status = statusFilter;
    if (priorityFilter !== "All") params.priority = priorityFilter;
    if (search) params.search = search;
    fetchTasks(params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, priorityFilter, search]);

  const sortedTasks = useMemo(
    () => [...tasks].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)),
    [tasks]
  );

  const handleSubmit = async (data) => {
    if (editingTask) {
      await editTask(editingTask._id, data);
      setEditingTask(null);
    } else {
      await addTask(data);
    }
    setShowForm(false);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this task?")) {
      await removeTask(id);
    }
  };

  return (
    <div>
      <div className="page-toolbar">
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option>All</option>
          <option>Pending</option>
          <option>Completed</option>
        </select>
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option>All</option>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <button
          className="btn btn-primary"
          onClick={() => {
            setEditingTask(null);
            setShowForm((prev) => !prev);
          }}
        >
          {showForm ? "Close" : "+ Add Task"}
        </button>
      </div>

      {showForm && (
        <div className="card">
          <TaskForm
            subjects={subjects}
            onSubmit={handleSubmit}
            editingTask={editingTask}
            onCancel={() => {
              setEditingTask(null);
              setShowForm(false);
            }}
          />
        </div>
      )}

      {loading && tasks.length === 0 ? (
        <Loader text="Loading tasks..." />
      ) : error ? (
        <EmptyState icon="⚠️" title="Something went wrong" message={error} />
      ) : sortedTasks.length === 0 ? (
        <EmptyState icon="✅" title="No tasks found" message="Try changing filters or add a new task." />
      ) : (
        <div className="card">
          {sortedTasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggle={toggleTaskStatus}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Tasks;
