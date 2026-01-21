export class TodoService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getTodos(userId) {
        if(!userId) throw { status: 400, message: 'Invalid userId!' };

        const result = await this.prisma.todo.findMany({
            where: {
                userId
            }
        });
        if(!result) throw { status: 404, message: 'todos not found!' };
        
        return result;
    }

    async addTodo(userId, task) {
        if(!userId || !task) throw { status: 400, message: 'Invalid userId or task!' };
        
        const result = await this.prisma.todo.create({
            data: {
                userId,
                task
            }
        });
        if(!result) throw { status: 404, message: `User with this id doesn't exist` };

        return result;
    }

    async updateTodo(id, userId, { completed, task }) {
        id = Number(id);
        if(Number.isNaN(id) || !userId) throw { status: 400, message: 'Invalid id or userId!' };
        if(!task || typeof completed !== 'boolean') throw { status: 400, message: 'Invalid task or completed!' };

        const result = await this.prisma.todo.update({
            where: {
                userId,
                id
            },
            data: {
                completed,
                task
            }
        });
        if(!result) throw { status: 404, message: `Todo wasn't found!` };
        
        return result;
    }

    async deleteTodo( id, userId ) {
        id = Number(id);
        if(Number.isNaN(id) || !userId) throw { status: 400, message: 'Invalid id or userId!' };

        const result = await this.prisma.todo.deleteMany({
            where: {
                userId,
                id
            }
        });
        if(result.count === 0) throw { status: 404, message: `Todo with id ${id} of user id ${userId} not found!` };

        return `Todo with id ${result.id} deleted successfully!`;
    }
}


