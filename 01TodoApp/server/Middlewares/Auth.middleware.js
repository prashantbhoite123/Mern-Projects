import { errorHandler } from "../Utils/errorHandler.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const isAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return next(errorHandler(400, "You have login first"))
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findById(decode._id)
    req.user = user
    next()
  } catch (e) {
    console.log(`Error While isAuthentication :${e}`)
  }
}
