import express from "express"
import {
  addTask,
  deleteTodo,
  editTodo,
  getallTodo,
  toggleTodo,
} from "../Controllers/Task.Controllers.js"
import { isAuthentication } from "../Middlewares/Auth.middleware.js"

const TaskRouter = express.Router()

TaskRouter.post("/addTask", isAuthentication, addTask)
TaskRouter.put("/editTodo/:id", isAuthentication, editTodo)
TaskRouter.get("/getallTask", isAuthentication, getallTodo)
TaskRouter.delete("/delete/:id", isAuthentication, deleteTodo)
TaskRouter.put("/toggle/:id", isAuthentication, toggleTodo)
export default TaskRouter
