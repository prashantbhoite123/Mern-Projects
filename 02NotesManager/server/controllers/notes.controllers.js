import { Notes } from "../models/notes.model.js"

export const Notescreate = async (req, res, next) => {
  try {
    const { title, description } = req.body
    await Notes.create({
      title,
      description,
      user: req.user,
    })
    res.status(200).json({ success: true, message: "Task Added" })
  } catch (e) {
    console.log(`Error While createNote :${e}`)
  }
}
