import express from "express"
import todosRoutes from "./todo.routes.js"
import usersRoutes from "./users.routes.js"

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);


export default router;