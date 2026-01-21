import { deleteTodoService, getTodoService, getTodosService } from "../../services/adminServices/todoService.js";

export const getTodos = async (req, res) => {
    try {
        const todos = await getTodosService();

        res.status(200).json(todos);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const getTodo = async (req, res) => {
    try {
        const todo = await getTodoService(req.params.id);
        
        res.status(200).json(todo);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await deleteTodoService(req.params.id);

        res.status(200).json({ message: deletedTodo });
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}