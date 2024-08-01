import http from "http"
import bodyParser from "body-parser"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
import { registerUserController } from "./controllers/auth"
import { deleteUsers, getListUsers, getUserById } from "./controllers/users"

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(
  cors({
    credentials: true,
  }),
)

app.use(compression())
app.use(bodyParser.json())
app.use(cookieParser())

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Server created at: http://localhost:${PORT}`))

// The connection with MongoDB is running on below, for question of good practices always use the promise from Mongo.

const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const MONGO_URL = `mongodb+srv://cribeirosamuel:${DATABASE_PASSWORD}@cluster0.uqb7wta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on("error", (error: Error) => console.log(`Houve erro durante a conexão: ${error}`))

// The lines above basically say: 'Dont use JS promise, use my promise instead.'

// Fow while we'll use this syntax (bring from controller -> run at main index.ts).
// But this thing later will be refactored.
app.get("/users", getListUsers)
app.get("/users/:id", getUserById)
app.post("/users", registerUserController)
app.delete("/users/:id", deleteUsers)
