import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import BoardView from "./components/BoardView";
import TaskModal from "./components/TaskModal";
import api from "./api";

export default function App() {
  const [boards, setBoards] = useState([]);
  const [currentBoardId, setCurrentBoardId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [taskSearch, setTaskSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("All");

  useEffect(() => {
    (async () => {
      const res = await api.get("/boards");
      setBoards(res.data);
      if (!currentBoardId && res.data.length > 0)
        setCurrentBoardId(res.data[0]._id);
    })();
  }, []);

  useEffect(() => {
    if (!currentBoardId) return;
    (async () => {
      const res = await api.get(`/boards/${currentBoardId}/tasks`);
      setTasks(res.data);
    })();
  }, [currentBoardId]);

  const handleCreateBoard = async () => {
    const name = window.prompt("Enter board name:");
    if (name) {
      await api.post("/boards", { name });
      const res = await api.get("/boards");
      setBoards(res.data);
      setCurrentBoardId(res.data[res.data.length - 1]._id);
    }
  };

  const handleSaveTask = async (task) => {
    if (editTask) {
      await api.put(`/tasks/${editTask._id}`, task);
    } else {
      await api.post("/tasks", { ...task, boardId: currentBoardId });
    }
    setModalOpen(false);
    setEditTask(null);
    const res = await api.get(`/boards/${currentBoardId}/tasks`);
    setTasks(res.data);
  };

  const handleDeleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    const res = await api.get(`/boards/${currentBoardId}/tasks`);
    setTasks(res.data);
  };

  return (
    <div className="flex">
      <Sidebar
        boards={boards}
        currentBoardId={currentBoardId}
        setCurrentBoardId={setCurrentBoardId}
        onCreateBoard={handleCreateBoard}
      />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6 text-center ">
          Board :{" "}
          {boards.find((b) => b._id === currentBoardId)?.name ||
            "No board selected"}
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-10 mb-6">
          <div className="mb-4 md:mb-0 w-full md:w-auto">
            <select
              className="p-2 border rounded w-full md:w-auto"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="flex-1 mb-4 md:mb-0">
            <input
              type="text"
              placeholder="Search tasks..."
              className="p-2 border rounded w-full"
              value={taskSearch}
              onChange={(e) => setTaskSearch(e.target.value)}
            />
          </div>

          <div className="w-full md:w-auto">
            <button
              onClick={() => setModalOpen(true)}
              className="w-full md:w-auto px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700"
            >
              + New Task
            </button>
          </div>
        </div>

        <BoardView
          tasks={tasks.filter(
            (task) =>
              (task.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
                task.description
                  .toLowerCase()
                  .includes(taskSearch.toLowerCase())) &&
              (priorityFilter === "All" || task.priority === priorityFilter)
          )}
          onEdit={(task) => {
            setEditTask(task);
            setModalOpen(true);
          }}
          onDelete={handleDeleteTask}
        />
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditTask(null);
        }}
        onSave={handleSaveTask}
        taskData={editTask}
      />
    </div>
  );
}
