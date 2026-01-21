import { prisma } from "../../prisma.js";

export const getTodosService = async () => {
    const result = await prisma.todo.findMany();
    if(result.count === 0) throw { status: 404, message: `Todos weren't found!` };
    
    return result;
}

export const getTodoService = async (id) => {
    id = Number(id);
    if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

    const result = await prisma.todo.findUnique({
        where: {
            id
        }
    });
    if(!result) throw { status: 404, message: `Todo with id ${id} not found` };

    return result;
}

export const deleteTodoService = async (id) => {
    id = Number(id);
    if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

    const result = await prisma.todo.deleteMany({
        where: {
            id
        }
    });
    if(result.count === 0) throw { status: 404, message: `Todo with id ${id} not found` };

    return `Todo with id ${id} successfully deleted`;
}