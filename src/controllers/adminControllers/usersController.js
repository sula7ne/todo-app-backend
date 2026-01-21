import { deleteUserService, getUserService, getUsersService } from "../../services/adminServices/usersService.js";

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        
        res.status(200).json(users);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await getUserService(req.params.id);
        
        res.status(200).json(user);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);

        res.status(200).json({ message: deletedUser });
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}