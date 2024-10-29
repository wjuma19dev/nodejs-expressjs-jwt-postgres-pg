import { Router } from "express"
import { loginCtrl, registerCtrl } from "../controllers/user.controller.js"
const router = Router()

router.post("/register", registerCtrl)
router.post("/login", loginCtrl)

export default router
