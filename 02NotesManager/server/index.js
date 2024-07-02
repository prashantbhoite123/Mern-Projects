import { config } from "dotenv"
import express from "express"
import { DatabaseConnection } from "./Data/database.js"
import cookieParser from "cookie-parser"
import router from "./routers/user.routes.js"
import { errorMiddleware } from "./middlewares/error.middleware.js"
config({ path: "./config/.env" })

const app = express()

// MiddleWares //
app.use(express.json())
DatabaseConnection()
app.use(cookieParser())

// Routers //
app.use("/api/user", router)
// server //
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`Server is Working on http://localhost:${process.env.PORT}`)
})
