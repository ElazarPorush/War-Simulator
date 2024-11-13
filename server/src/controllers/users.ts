import { Router } from "express"
import { register } from "../routes/users"

const router = Router()


router.post("/register", register)

router.post("/login", ()=>{})

router.patch("/updateMissiles/:id", ()=>{})

export default router