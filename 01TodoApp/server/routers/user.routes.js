import express from "express"
import {
  Delete,
  Login,
  Logout,
  Profile,
  Register,
  Update,
  googleAuth,
} from "../Controllers/user.controllers.js"
import { isAuthentication } from "../Middlewares/Auth.middleware.js"

const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.get("/auth", isAuthentication)
router.get("/profile", isAuthentication, Profile)
router.get("/logout", isAuthentication, Logout)
router.put("/update/:id", isAuthentication, Update)
router.delete("/delete/:id", isAuthentication, Delete)
router.post("/googleAuth", googleAuth)

export default router
