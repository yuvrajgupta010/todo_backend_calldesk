import express from "express";
import { authenticateToken } from "../middlewares/jwt.js";
import { body } from "express-validator";
import {
  createTodoController,
  deleteTodoController,
  getTodoController,
  updateTodoController,
} from "../controllers/todo.js";
import { jsonBodyParser } from "../middlewares/bodyParser.js";

const todoRouter = express.Router();

// protect all routes with JWT authentication
todoRouter.use(authenticateToken);

todoRouter.get("/", getTodoController);

todoRouter.post(
  "/",
  jsonBodyParser,
  body("todoContent").trim().notEmpty().withMessage("Todo content is required"),
  createTodoController
);

todoRouter.put(
  "/:todoId",
  jsonBodyParser,
  [
    body("todoContent")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Todo content sould not be empty"),
    body("isDone")
      .optional()
      .isBoolean()
      .withMessage("isDone must be a boolean"),
  ],
  updateTodoController
);

todoRouter.delete("/:todoId", deleteTodoController);

export default todoRouter;
