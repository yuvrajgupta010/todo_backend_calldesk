import expressValidation from "../helpers/validation.js";
import Todo from "../models/todo.js";

export const getTodoController = async (req, res, next) => {
  try {
    expressValidation(req);

    const { userId } = req?.jwtPayload;

    const todos = await Todo.find({
      todoOwner: userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      data: { todos: todos.map((todo) => todo.toClient()) },
      message: "Todos fetched successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const createTodoController = async (req, res, next) => {
  try {
    expressValidation(req);

    const { todoContent } = req.body;
    const { userId } = req?.jwtPayload;

    const todo = new Todo({
      todoContent,
      todoOwner: userId,
    });

    await todo.save();

    return res.status(201).json({
      message: "Todo added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const updateTodoController = async (req, res, next) => {
  try {
    expressValidation(req);
    const { todoId } = req.params;

    const updatedFields = {};
    if (req?.body?.todoContent)
      updatedFields.todoContent = req?.body?.todoContent;
    if (req?.body?.isDone !== undefined)
      updatedFields.isDone = req?.body?.isDone;
    const { userId } = req?.jwtPayload;

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId, todoOwner: userId },
      updatedFields,
      { new: true, runValidators: true }
    );

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      message: "Todo updated successfully.",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTodoController = async (req, res, next) => {
  try {
    expressValidation(req);

    const { todoId } = req.params;
    const { userId } = req?.jwtPayload;

    const todo = await Todo.findOneAndDelete({
      _id: todoId,
      todoOwner: userId,
    });

    if (!todo) {
      const error = new Error("Todo not found");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      message: "Todo deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};
