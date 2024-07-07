import express from "express"
import { isAuthentication } from "../middlewares/Auth.middleware.js"
import {
  deleteNotes,
  getallnotes,
  Notescreate,
  searchNote,
  updateNotes,
} from "../controllers/notes.controllers.js"

const notesRoute = express.Router()

notesRoute.post("/notes", isAuthentication, Notescreate)
notesRoute.get("/getAllNote", isAuthentication, getallnotes)
notesRoute.put("/updateNote/:id", isAuthentication, updateNotes)
notesRoute.delete("/deleteNote/:id", isAuthentication, deleteNotes)
notesRoute.get("/searchNote", isAuthentication, searchNote)
notesRoute.delete("/multipaldelnotes", isAuthentication, deleteNotes)

export default notesRoute
