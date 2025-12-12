import { Router } from "express";
import { login, Register, logout, addPassword, deletePassword, updatePassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()


router.route("/").get((req, res) => {
    res.send("User route is working")
})
router.route("/register").post(Register)
router.route("/login").post(login)
router.route("/logout").post(verifyJWT, logout)
router.route("/me").get(verifyJWT, async (req, res) => {
     res.json({
        success: true,
        user: req.user
    })
})
router.route("/addPassword").post(verifyJWT, addPassword)
router.route("/deletePassword").post(verifyJWT, deletePassword)
router.route("/updatePassword").put(verifyJWT, updatePassword)

export default router