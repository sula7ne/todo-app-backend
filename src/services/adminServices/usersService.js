import { prisma } from "./../../prisma.js";

export const getUsersService = async () => {
    const result = await prisma.user.findMany();
    if(result.count === 0) throw { status: 404, message: `Users weren't found!` };

    return result;
}

export const getUserService = async (id) => {
    id = Number(id);
    if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };
    
    const result = await prisma.user.findUnique({
        where: {
            id
        }
    });
    if(!result) throw { status: 404, message: `User with id ${id} not found` };

    return result;
} 

export const deleteUserService = async (id) => {
    id = Number(id);
    if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

    const result = await prisma.user.delete({
        where: {
            id
        }
    });
    if(!result) throw { status: 404, message: `User with id ${id} not found` };

    return `User with id ${id} successfully deleted`;
}