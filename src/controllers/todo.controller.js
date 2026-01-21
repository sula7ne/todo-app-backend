import { TodoService } from "../services/todo.service.js"
import { prisma } from "../prisma.js";

const todoService = new TodoService(prisma);

export const getTodos = async (req, res) => {
    try {
        const todos = await todoService.getTodos(req.userId);
        
        res.status(200).json(todos);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
};

export const addTodo = async (req, res) => {
    try {
        const addedTodo = await todoService.addTodo(req.userId, req.body.task);

        res.status(201).json(addedTodo);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await todoService.updateTodo(req.params.id, req.userId, req.body);
        
        res.status(200).json(updatedTodo);
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const deletedTodo = await todoService.deleteTodo(req.params.id, req.userId);

        res.status(200).send({ message: deletedTodo });
    } catch(err) {
        res.status(err.status || 500).json({ message: err.message || 'Server error!' });
    }
};
