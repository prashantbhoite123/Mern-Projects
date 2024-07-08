import mongoose from "mongoose"
import { Notes } from "../models/notes.model.js"
import { errorHandler } from "../utils/error.hadler.js"

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
    console.log(`While updateNotes Api :${e}`)
  }
}

export const deleteNotes = async (req, res) => {
  try {
    const { ids } = req.body
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(200).json({ message: "invalid requist" })
    }

    // const objectIds = ids.map((id) => new mongoose.Types.objectIds(id))

    const result = await Notes.deleteMany({ _id: { $in: ids } })

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, message: "No notes found" })
    }

    res.status(200).json({ message: `${ids.length} notes deleted`, result })
  } catch (e) {
    console.log(`Error While deleteNote :${e}`)
  }
}

export const singleFDelete = async () => {
  const { id } = req.params
  if (!id) {
    return next(errorHandler(400, "Id not found"))
  }
  await Notes.findByIdAndDelete(id)
  res.status(200).json({ success: true, message: "Notes Deleted " })
}

export const searchNote = async (req, res, next) => {
  try {
    const title = req.query.title
    console.log(title)
    if (!title) {
      return next(errorHandler(400, " Title query parameter is required"))
    }
    const regex = new RegExp(title, "i")
    const searchNote = await Notes.find({
      $or: [
        {
          title: { $regex: regex },
        },
      ],
    })

    console.log(searchNote)
    if (!searchNote) {
      return next(errorHandler(400, "No available input"))
    }
    res.status(200).json(searchNote)
  } catch (e) {
    console.log(`Error While search Api ${e}`)
  }
}

export const deletenotesandStoreResycalBin = async (req, res, next) => {
  try {
    const { ids } = req.body
    if (!ids || !Array.isArray(ids)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid responce" })
    }

    const allres = await Notes.find({ _id: ids })
    console.log(allres)

    const result = await Notes.updateMany(
      { _id: { $in: ids } },
      { $set: { isComplete: true } }
    )
    if (result.length === 0) {
      return next(errorHandler(400, "No Notes Found"))
    }
    res
      .status(200)
      .json({ success: true, message: "Notes moved to recycle bin", allres })
  } catch (e) {
    console.log(`Error While deletenotesandStoreResycalBin :${e}`)
  }
}
