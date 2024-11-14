import { Router } from "express"
import { getAttacks } from "../routes/attacks"
import verifyUser from "../middlewares/verifyUser"

const router = Router()

router.get("/", verifyUser, getAttacks)

export default router