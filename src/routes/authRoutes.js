import { loginUser, refreshUsersToken, registerUser } from "../controllers/authController.js"

import express from "express"

const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/refresh', refreshUsersToken);

export default router;