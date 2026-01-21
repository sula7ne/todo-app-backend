export class TodoService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getTodos() {
        const result = await this.prisma.todo.findMany();
        if(result.count === 0) throw { status: 404, message: `Todos weren't found!` };
        
        return result;
    }

    async getTodo(id) {
        id = Number(id);
        if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

        const result = await this.prisma.todo.findUnique({
            where: {
                id
            }
        });
        if(!result) throw { status: 404, message: `Todo with id ${id} not found` };

        return result;
    }

    async deleteTodo(id) {
        id = Number(id);
        if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

        const result = await this.prisma.todo.deleteMany({
            where: {
                id
            }
        });
        if(result.count === 0) throw { status: 404, message: `Todo with id ${id} not found` };

        return `Todo with id ${id} successfully deleted`;
    }
}