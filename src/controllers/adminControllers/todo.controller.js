import { TodoService } from "../../services/adminServices/todo.service.js";
import { prisma } from "../../prisma.js";

const todoService = new TodoService(prisma);

export const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getTodos();

        res.status(200).json(todos);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const getTodo = async (req, res) => {
    try {
        const todo = await todoService.getTodo(req.params.id);
        
        res.status(200).json(todo);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todoService.deleteTodo(req.params.id);

        res.status(200).json({ message: deletedTodo });
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
}