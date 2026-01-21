import { deleteTodo, getTodo, getTodos } from "../../controllers/adminControllers/todo.controller.js"

import express from "express"

const router = express.Router();

router.get('/', getTodos);

router.get('/:id', getTodo);

router.delete('/:id', deleteTodo);

export default router;