import dotenv from "dotenv"
dotenv.config()
import { ErrorHandler, NotFound } from "./utils/ErrorHandler"
import formData from "express-form-data"
import { prisma } from "./database"
import routing from "./routing"
import session from "./session"
import express from "express"
import cors from "cors"

export const startServer = async () => {
  try {
    await prisma.$connect().then(() => console.log("Successfully connected to the database!"))

    const app = express()
    app.use(cors({ credentials: true, origin: process.env.FRONTEND_URL }))
    app.use(express.json())
    app.use(formData.parse())

    // Routes - Session
    session(app)
    routing(app)

    // Middleware
    app.use(NotFound)
    app.use(ErrorHandler)

    // Server
    const PORT = process.env.PORT || 8000

    const server = app.listen(PORT, () => console.log(`The server is currently running on port ${PORT}!`))
    return server
  } catch (error) {
    console.log(error.message)
  }
}
