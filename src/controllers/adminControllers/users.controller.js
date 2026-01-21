import { UsersService } from "../../services/adminServices/users.service.js";
import { prisma } from "../../prisma.js";

const usersService = new UsersService(prisma);

export const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();
        
        res.status(200).json(users);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await usersService.getUser(req.params.id);
        
        res.status(200).json(user);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await usersService.deleteUser(req.params.id);

        res.status(200).json({ message: deletedUser });
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}