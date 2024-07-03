import { User } from "../models/user.model.js"
import { errorHandler } from "../utils/error.hadler.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return next(errorHandler(400, "User Already exist"))
    }

    const hashpassword = bcryptjs.hashSync(password, 10)

    await User.create({
      name,
      email,
      password: hashpassword,
    })
    res
      .status(201)
      .json({ success: true, message: "User Register SuccessFull" })
  } catch (e) {
    console.log(`Error While user Register :${e}`)
  }
}

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const existuser = await User.findOne({ email })
    if (!existuser) {
      return next(errorHandler(400, "You have Register First"))
    }
    const ismatchPassword = bcryptjs.compareSync(password, existuser.password)
    if (!ismatchPassword) {
      return next(errorHandler(400, "Invalid email or Password"))
    }

    const { password: abc, ...rest } = existuser._doc

    const token = jwt.sign({ _id: existuser._id }, process.env.SECRETKEY)
    res
      .cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
      .json({ success: true, message: "User Login SuccessFull", rest })
  } catch (e) {
    console.log(`Error While Login User :${e}`)
  }
}

export const Profile = (req, res) => {
  try {
    const { user } = req

    const { password, ...rest } = user._doc
    res.status(200).json(rest)
  } catch (e) {
    console.log(`Error While Profile :${e}`)
  }
}

export const Logout = (req, res) => {
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "User logout successfull " })
}

export const Delete = async (req, res) => {
  const { id } = req.params

  await User.findByIdAndDelete(id)
  res
    .clearCookie("token")
    .status(200)
    .json({ success: true, message: "Usere Deleted Successfull" })
}

export const Update = async (req, res, next) => {
  try {
    if (req.body.email) {
      const existEmail = await User.findOne({ email: req.body.email })
      if (existEmail) {
        return next(errorHandler(400, "User Already exist"))
      }
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const { id } = req.params
    const userUpdate = await User.findByIdAndUpdate(
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

    const { password, ...rest } = userUpdate._doc
    res
      .status(200)
      .json({ success: true, message: "User Update successFull", rest })
  } catch (e) {
    console.log(`Error While Update Api :${e}`)
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    const { name, email, profilepic } = req.body
    const existUser = await User.findOne({ email })
    if (existUser) {
      const token = jwt.sign({ _id: existUser._id }, process.env.SECRETKEY, {
        expiresIn: "1d",
      })

      const { password, ...rest } = existUser._doc

      return res
        .cookie("token", token, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json(rest)
    }
    const password = Math.floor(
      Math.random() * 8000000000 + 8000000000
    ).toString()
    const bcryptjsPassword = bcryptjs.hashSync(password, 10)

    const user = await User.create({
      name,
      email,
      profilepic,
      password: bcryptjsPassword,
    })

    const { password: abc, ...rest } = user._doc
    const token = jwt.sign({ _id: existUser._id }, process.env.SECRETKEY, {
      expiresIn: "1d",
    })

    return (
      res,
      cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        .status(200)
        .json(rest)
    )
  } catch (e) {
    console.log(`Error While GoogleAuth APi :${e}`)
  }
}
