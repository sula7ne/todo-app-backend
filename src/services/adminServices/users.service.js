export class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async getUsers() {
        const result = await this.prisma.user.findMany();
        if(result.count === 0) throw { status: 404, message: `Users weren't found!` };

        return result;
    }
    
    async getUser(id) {
        id = Number(id);
        if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };
        
        const result = await this.prisma.user.findUnique({
            where: {
                id
            }
        });
        if(!result) throw { status: 404, message: `User with id ${id} not found` };

        return result;
    } 

    async deleteUser(id) {
        id = Number(id);
        if(Number.isNaN(id)) throw { status: 400, message: 'Invalid id' };

        const result = await this.prisma.user.deleteMany({
            where: {
                id
            }
        });
        if(result.count === 0) throw { status: 404, message: `User with id ${id} not found` };

        return `User with id ${id} successfully deleted`;
    }
}