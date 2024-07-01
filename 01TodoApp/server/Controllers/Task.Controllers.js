import { errorHandler } from "../Utils/errorHandler.js"
import { Task } from "../models/Task.js"
export const addTask = async (req, res, next) => {
  try {
    const { tittle } = req.body
    await Task.create({
      tittle,
      user: req.user,
    })
    res.status(200).json({ success: true, message: "Task Added" })
  } catch (e) {
    console.log(`Error While AdddTodoApi :${e}`)
  }
}

export const getallTodo = async (req, res, next) => {
  try {
    const { user } = req

    const allTask = await Task.find({ user })
    console.log(allTask)
    res.status(200).json({ allTask })
  } catch (e) {
    console.log(`  While getallTodo :${e}`)
  }
}

export const deleteTodo = async (req, res, next) => {
  console.log(req.params.id)
  try {
    const { id } = req.params
    const existTodo = await Task.findById(id)

    await Task.findByIdAndDelete(existTodo._id)
    res.status(200).json({ success: true, message: "Task Delete Successfull" })
  } catch (e) {
    console.log(`Error While DeleteTodo :${e}`)
  }
}

export const editTodo = async (req, res, next) => {
  try {
    const { id } = req.params
    console.log("this is is", id)
    if (!id) {
      return next(errorHandler(400, "Invalid id"))
    }
    
    const update = await Task.findByIdAndUpdate(id, {
      $set: {
        tittle: req.body.tittle,
      },
    })

    console.log(update)
    res.status(200).json({ success: true, message: "Todo Update Success" })
  } catch (e) {
    console.log(`Error While editTodo :${e}`)
  }
}

export const toggleTodo = async (req, res, next) => {
  const { id } = req.params
  const toggle = await Task.findById(id)

  toggle.isComplete = !toggle.isComplete
  toggle.save()
  console.log(toggle)
  res.status(200).json({ success: true, message: "task togle" })
}
