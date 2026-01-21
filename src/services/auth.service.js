import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export class AuthService {
    constructor(prisma) {
        this.prisma = prisma;
    }

    async register({ username, password }) {
        if(
            !username || !password 
            || password.length < 6 || 
            !username.includes('@')
        ) throw { status: 401, message: 'Invalid username or password!' };
        
        // check if user exists
        const existedUser = await this.prisma.user.findUnique({
            where: {
                username
            }
        });
        if(existedUser) throw { status: 400, message: 'User already exists' };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        
        // make first todo
        const defaultTodo = 'First todo :)';
        await this.prisma.todo.create({
            data: {
                userId: user.id,
                task: defaultTodo
            }
        });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        
        return { token };
    }

    async login({ username, password }) {
        if(
            !username || !password 
            || password.length < 6 || 
            !username.includes('@')
        ) throw { status: 401, message: 'Invalid username or password!' };

        const user = await this.prisma.user.findUnique({
            where: {
                username
            }
        });
        if(!user) throw { status: 404, message: 'User with this username not found!' };
        
        const passwordChecked = await bcrypt.compare(password, user.password);
        if(!passwordChecked) throw { staus: 401, message: 'Incorrect password!' };

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        return { token };
    }
}

