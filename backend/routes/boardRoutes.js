import express from "express";
import Board from "../Models/Board.js";
import Task from "../Models/Task.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const boards = await Board.find();
  res.json(boards);
});

router.post("/", async (req, res) => {
  const board = new Board({ name: req.body.name });
  await board.save();
  res.status(201).json(board);
});

router.get("/:id/tasks", async (req, res) => {
  const tasks = await Task.find({ boardId: req.params.id });
  res.json(tasks);
});

export default router;
