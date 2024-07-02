import { User } from "../models/user.model.js"
import { errorHandler } from "../utils/error.hadler.js"
import jwt from "jsonwebtoken"

export const isAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies

    if (!token) {
      return next(errorHandler(400, "You have Login First"))
    }
    const decode = jwt.verify(token, process.env.SECRETKEY)
    const user = await User.findById(decode._id)
    req.user = user
    next()
  } catch (e) {
    console.log(`Error While isAuthentication :${e}`)
  }
}
