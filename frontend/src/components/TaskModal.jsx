import React, { useState, useEffect } from "react";

export default function TaskModal({ isOpen, onClose, onSave, taskData }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "To Do",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    if (taskData) {
      setForm(taskData);
    } else {
      setForm({
        title: "",
        description: "",
        priority: "Low",
        status: "To Do",
        assignedTo: "",
        dueDate: "",
      });
    }
  }, [taskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h2 className="text-xl font-bold">
          {taskData ? "Edit Task" : "New Task"}
        </h2>
        <input
          className="w-full p-2 border rounded"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <textarea
          className="w-full p-2 border rounded"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <div className="flex space-x-2">
          <select
            className="flex-1 p-2 border rounded"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select
            className="flex-1 p-2 border rounded"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
        </div>
        <input
          className="w-full p-2 border rounded"
          name="assignedTo"
          value={form.assignedTo}
          onChange={handleChange}
          placeholder="Assigned To"
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          name="dueDate"
          value={form.dueDate?.split("T")[0]}
          onChange={handleChange}
        />
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-red-700 rounded"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-green-500 rounded"
          >
            {taskData ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
