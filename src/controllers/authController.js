import { loginUserService, refreshUsersTokenService, registerUserService } from "../services/authService.js"

export const registerUser = async (req, res) => {
    try {
        const access_token = await registerUserService(req.body);

        res.status(201).json(access_token);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!'});
    }
}

export const loginUser = async (req, res) => {
    try {
        const access_token = await loginUserService(req.body);

        res.status(200).json(access_token);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const refreshUsersToken = async (req, res) => {
    try {
        const access_token = await refreshUsersTokenService();
        
        res.status(201).json(access_token);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!'})
    }
}