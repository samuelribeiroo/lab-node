import { Router } from "express"
import { loginUserController, registerUserController } from "../controllers/auth"
import { deleteUsers, getListUsers, getUserById, updateUser } from "../controllers/users"

const router = Router()

router.post("/auth", registerUserController)
router.post("/auth/:id", loginUserController)
router.get("/users", getListUsers)
router.get("/users/:id", getUserById)
router.put("/users/:id", updateUser)
router.delete("/users/:id", deleteUsers)

export default router

// All methods above with HTTP Methods are being imported at main file and will handle with routering our application.
