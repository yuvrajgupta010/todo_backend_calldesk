import env from "dotenv";
env.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";
import { mongoDBConnection } from "./config/mongoDB.js";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.use(
  cors({
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    // origin: process.env.CLIENT_URL,
  })
);
app.use(helmet());

app.use("/auth", authRouter);
app.use("/todo", todoRouter);

// Not found
app.use((req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "404 NOT FOUND";
  next(error);
});

app.use(errorMiddleware);

mongoDBConnection.then(() => {
  console.log("Successfully connected to DB");
  app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
  });
});
