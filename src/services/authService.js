import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { prisma } from "./../prisma.js";

export const registerUserService = async ({ username, password }) => {
    if(
        !username || !password 
        || password.length < 6 || 
        !username.includes('@')
    ) throw { status: 401, message: 'Invalid username or password!' };
    
    // check if user exists
    const existedUser = await prisma.user.findUnique({
        where: {
            username
        }
    });
    if(existedUser) throw { status: 400, message: 'User already exists' };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        }
    });
    // const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username, hashedPassword);
    
    // make first todo
    const defaultTodo = 'First todo :)';
    await prisma.todo.create({
        data: {
            userId: user.id,
            task: defaultTodo
        }
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    
    return { token };
}

export const loginUserService = async ({ username, password }) => {
    if(
        !username || !password 
        || password.length < 6 || 
        !username.includes('@')
    ) throw { status: 401, message: 'Invalid username or password!' };

    const user = await prisma.user.findUnique({
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

export const refreshUsersTokenService = async () => {
    
}