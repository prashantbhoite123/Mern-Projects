import { errorHandler } from "../Utils/errorHandler.js"
import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return next(errorHandler(400, "User  allready existed"))
    }

    const hasspassword = bcryptjs.hashSync(password, 10)

    await User.create({ name, email, password: hasspassword })
    res
      .status(200)
      .json({ success: true, message: "User Registere Successfully" })
  } catch (error) {
    console.log(`Error While Register User :${error}`)
  }
}

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const existUser = await User.findOne({ email })
    if (!existUser) {
      return next(errorHandler(404, "You have Sign Up first"))
    }

    const ismatchPassword = bcryptjs.compareSync(password, existUser.password)
    if (!ismatchPassword) {
      return next(errorHandler(400, "Invalid email or Password "))
    }
    const token = jwt.sign({ _id: existUser._id }, process.env.SECRET_KEY)

    const { password: abc, ...rest } = existUser._doc
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json(rest)
  } catch (e) {
    console.log(`Error While Login user :${e}`)
  }
}

export const Profile = (req, res) => {
  const { user } = req
  const { password, ...rest } = user._doc
  res.status(200).json(rest)
}

export const Logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "User logoutSuccess Full" })
}

export const Update = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(404, "you have Update only your account"))
  }
  try {
    if (req.body.email) {
      const existEmail = await User.findOne({ email: req.body.email })

      if (existEmail) {
        return next(400, "User Already exist")
      }
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const { id } = req.params

    const UserUpdated = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    )

    const { password, ...rest } = UserUpdated._doc
    res
      .status(200)
      .json({ success: true, message: "User Update SuccessFull", rest })
  } catch (e) {
    console.log(`Error While Update Api :${e}`)
  }
}

export const Delete = async (req, res, next) => {
  try {
    const { id } = req.params

    await User.findByIdAndDelete(id)

    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "User Deleted Success Full" })
  } catch (e) {
    console.log(`Error While Delete User :${e}`)
  }
}
