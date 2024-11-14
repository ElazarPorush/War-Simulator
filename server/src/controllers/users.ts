import { Router } from "express"
import { getProfile, login, register } from "../routes/users"
import verifyUser from "../middlewares/verifyUser"

const router = Router()


router.post("/register", register)

router.post("/login", login)

router.post("/", verifyUser, getProfile)

export default router