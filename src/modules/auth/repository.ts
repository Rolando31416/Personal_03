import { UserI } from "../../interfaces/Auth.interface";
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join('src', 'data', 'users.json');
export default class AuthRepository {

    async readUsers(): Promise<UserI[] | Array<UserI>> {
        try {
            const data = await fs.readFile(dataFilePath, 'utf-8')
            return JSON.parse(data)
        } catch (error) {
            return []
        }
    }

    async writeUsers(users: UserI[]): Promise<void>{
        await fs.writeFile(dataFilePath, JSON.stringify(users, null, 2), 'utf-8')
    }

    async createUser(user: UserI): Promise<UserI> {
        const users = await this.readUsers();
        users.push(user);
        await this.writeUsers(users);
        return user;
    }

    async findByUsername(username: string): Promise<UserI | undefined> {
        const users = await this.readUsers();
        return users.find((user) => user.username === username);
    }

}

/*

post http://localhost:3000/api/auth/login 
{
    "username": "marlon",
    "password": "1995"
}

post http://localhost:3000/api/auth/register

Body / row 

{
  "username": "x",
  "password": "x",
  "email": "usuarioxejemplocom",
  "fechaNacimiento": "1968-08-16"
}



*/
