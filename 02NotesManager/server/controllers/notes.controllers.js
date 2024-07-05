import { Notes } from "../models/notes.model.js"

export const Notescreate = async (req, res, next) => {
  try {
    const { title, description } = req.body
    const CreatedNote = await Notes.create({
      title,
      description,
      user: req.user,
    })

    res.status(200).json({ success: true, message: "Task Added" })
  } catch (e) {
    console.log(`Error While createNote :${e}`)
  }
}

export const getallnotes = async (req, res) => {
  try {
    const { user } = req
    const allTask = await Notes.findOne({ user })
    res.status(200).json([allTask])
  } catch (e) {
    console.log(`Error While getALlTask Api :${e}`)
  }
}
