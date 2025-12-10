import { Router } from "express";
import { login, Register, logout, addPassword, deletePassword, updatePassword } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router()
// Welcome route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Password Manager API is running',
    status: 'OK',
    endpoints: {
      users: '/api/users',
      auth: '/api/auth',
      // list your other endpoints
    }
  });
});
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