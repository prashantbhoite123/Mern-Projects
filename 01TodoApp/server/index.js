import { config } from "dotenv"
import express from "express"
import { DatabaseConnection } from "./Data/Database.js"
import cookieParser from "cookie-parser"
import { errorMiddleware } from "./Middlewares/error.middlewares.js"
import router from "./routers/user.routes.js"
config({ path: "./config/.env" })
const app = express()

// Middlewares //
app.use(express.json())
DatabaseConnection()
app.use(cookieParser())
// Routers //

app.use("/api/user", router)
// Server //
app.use(errorMiddleware)
app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
})
