import express from "express"
import {
  Delete,
  Login,
  Logout,
  Profile,
  Register,
  Update,
  googleAuth,
} from "../controllers/user.controlers.js"
import { isAuthentication } from "../middlewares/Auth.middleware.js"
const router = express.Router()

router.post("/register", Register)
router.post("/login", Login)
router.get("/profile", isAuthentication, Profile)
router.get("/logout", isAuthentication, Logout)
router.put("/update/:id", isAuthentication, Update)
router.delete("/delete/:id", isAuthentication, Delete)
router.post("/google", googleAuth)

export default router
