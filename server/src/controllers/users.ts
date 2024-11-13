import { Router } from "express"
import { login, register } from "../routes/users"

const router = Router()


router.post("/register", register)

router.post("/login", login)

router.patch("/updateMissiles/:id", ()=>{})

export default router