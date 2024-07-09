import express from "express"
import { isAuthentication } from "../middlewares/Auth.middleware.js"
import {
  deleteNotes,
  deletenotesandStoreResycalBin,
  getallnotes,
  Notescreate,
  NotesPin,
  restoreNotes,
  searchNote,
  shortNotes,
  singleFDelete,
  updateNotes,
} from "../controllers/notes.controllers.js"

const notesRoute = express.Router()

notesRoute.post("/notes", isAuthentication, Notescreate)
notesRoute.get("/getAllNote", isAuthentication, getallnotes)
notesRoute.put("/updateNote/:id", isAuthentication, updateNotes)
notesRoute.delete("/deleteNote/:id", isAuthentication, deleteNotes)
notesRoute.get("/searchNote", isAuthentication, searchNote)
notesRoute.post("/multipaldelnotes", isAuthentication, deleteNotes)
notesRoute.get("/resycal", isAuthentication, deleteNotes)
notesRoute.delete("/deleteNote/:id", isAuthentication, singleFDelete)
notesRoute.post(
  "/deleteAndSroreRebin",
  isAuthentication,
  deletenotesandStoreResycalBin
)
notesRoute.put("/restoreNote", isAuthentication, restoreNotes)
notesRoute.get("/shortNotes", isAuthentication, shortNotes)
notesRoute.get("/notesPin/:id", isAuthentication, NotesPin)

export default notesRoute
