import React, { useState } from "react";

export default function Sidebar({
  boards,
  currentBoardId,
  setCurrentBoardId,
  onCreateBoard,
}) {
  const [search, setSearch] = useState("");

  const filteredBoards = boards.filter((board) =>
    board.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-64 bg-gray-100 h-screen p-4 border-r flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold mb-4">Boards</h2>
        <input
          type="text"
          placeholder="Search boards..."
          className="mb-4 w-full p-2 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {filteredBoards.map((board) => (
            <li
              key={board._id}
              className={`p-2 mb-2 rounded cursor-pointer ${
                currentBoardId === board._id
                  ? "bg-[#80669d] text-black"
                  : "hover:bg-gray-200"
              }`}
              onClick={() => setCurrentBoardId(board._id)}
            >
              {board.name}
            </li>
          ))}
          {filteredBoards.length === 0 && (
            <p className="text-sm text-gray-500">No boards found</p>
          )}
        </ul>
      </div>
      <button
        onClick={onCreateBoard}
        className="mt-4 p-2 bg-[#80669d] text-black rounded"
      >
        + New Board
      </button>
    </div>
  );
}
