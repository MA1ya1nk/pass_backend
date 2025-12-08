import { Router } from "express";
import { login, Register, logout } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()

router.route("/register").post(Register)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/me").get(verifyJWT, async (req, res) => {
     res.json({
        success: true,
        user: req.user
    })
})

export default router