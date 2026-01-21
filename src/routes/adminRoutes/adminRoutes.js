import express from "express"
import todosRoutes from "./todoRoutes.js"
import usersRoutes from "./usersRoutes.js"

const router = express.Router();

router.use('/users', usersRoutes);
router.use('/todos', todosRoutes);


export default router;