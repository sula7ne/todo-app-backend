import { deleteUser, getUser, getUsers } from "../../controllers/adminControllers/users.controller.js"

import express from "express"

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUser);

router.delete('/:id', deleteUser);

export default router;