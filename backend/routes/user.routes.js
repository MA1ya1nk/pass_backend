import { Router } from "express";
import { login, Register, logout, addPassword, deletePassword, updatePassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

router.use(express.static(path.join(__dirname, "../frontend/dist")));
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

export default router