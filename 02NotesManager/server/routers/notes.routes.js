import express from "express"
import { isAuthentication } from "../middlewares/Auth.middleware.js"
import { Notescreate } from "../controllers/notes.controllers.js"

const notesRoute = express.Router()

notesRoute.post("/notes", isAuthentication, Notescreate)

export default notesRoute
