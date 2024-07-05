import express from "express"
import { isAuthentication } from "../middlewares/Auth.middleware.js"
import { getallnotes, Notescreate } from "../controllers/notes.controllers.js"

const notesRoute = express.Router()

notesRoute.post("/notes", isAuthentication, Notescreate)
notesRoute.get("/getAllNote", isAuthentication, getallnotes)

export default notesRoute
