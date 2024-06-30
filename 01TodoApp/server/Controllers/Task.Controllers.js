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

export const deleteTodo = async (req, res) => {
  try {
    const id = req.params.id
    const { tittle } = req.body
    const validTodo = await Task.findOne({ tittle })
    // const existTodo = await Task.findById(id)
    const Thisdelete = await Task.findByIdAndDelete(id)
    console.log(Thisdelete)

    res.status(200).json({ success: true, message: "Task Delete Successfull" })
  } catch (e) {
    console.log(`Error While DeleteTodo :${e}`)
  }
}

export const editTodo = async (req, res) => {
  try {
    const { id } = req.params
    // const findtodo = await Task.findById(id)

    console.log(validTodo)
  } catch (e) {
    console.log(`Error While editTodo :${e}`)
  }
}
