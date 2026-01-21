import { AuthService } from "./../services/auth.service.js"
import { prisma } from "../prisma.js";

const authService = new AuthService(prisma);

export const registerUser = async (req, res) => {
    try {
        const access_token = await authService.register(req.body);

        res.status(201).json(access_token);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!'});
    }
}

export const loginUser = async (req, res) => {
    try {
        const access_token = await authService.login(req.body);

        res.status(200).json(access_token);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}