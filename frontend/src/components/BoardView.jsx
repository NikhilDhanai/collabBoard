import React from "react";

export default function BoardView({ tasks, onEdit, onDelete }) {
  const statuses = ["To Do", "In Progress", "Done"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {statuses.map((status) => (
        <div key={status}>
          <h2 className="text-xl font-bold mb-4 text-center">{status}</h2>

          {tasks.filter((task) => task.status === status).length === 0 && (
            <p className="text-gray-500 text-center">No tasks.</p>
          )}

          {tasks
            .filter((task) => task.status === status)
            .map((task) => (
              <div
                key={task._id}
                className="bg-white p-4 mb-4 rounded shadow border flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold mb-2">{task.title}</h3>
                  <p className="mb-2 text-gray-700">{task.description}</p>
                  <div className="flex items-center text-sm space-x-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded 
                        ${
                          task.priority === "High"
                            ? "bg-red-700 text-black"
                            : ""
                        }
                        ${
                          task.priority === "Medium"
                            ? "bg-yellow-100 text-black"
                            : ""
                        }
                        ${
                          task.priority === "Low"
                            ? "bg-green-300 text-black"
                            : ""
                        }
                      `}
                    >
                      {task.priority}
                    </span>

                    {task.dueDate && (
                      <span className="ml-auto text-gray-500">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-2 mt-4">
                  <button
                    onClick={() => onEdit(task)}
                    className="flex-1 p-2 bg-blue-500 text-black rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    className="flex-1 p-2 bg-red-500 text-red-600 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
