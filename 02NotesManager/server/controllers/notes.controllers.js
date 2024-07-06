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
    const allTask = await Notes.find({ user })
    res.status(200).json(allTask)
  } catch (e) {
    console.log(`Error While getALlTask Api :${e}`)
  }
}

export const updateNotes = async (req, res, next) => {
  try {
    const { id } = req.params

    const notesUpdated = await Notes.findByIdAndUpdate(
      id,
      {
        $set: {
          title: req.body.title,
          description: req.body.description,
        },
      },
      { new: true }
    )
    console.log(notesUpdated)
    res
      .status(200)
      .json({ success: true, message: "Notes updated", notesUpdated })
  } catch (e) {
    console.log(`Error While updateNotes Api :${e}`)
  }
}
