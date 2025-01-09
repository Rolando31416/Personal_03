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

******************************************************
*
******************************************************

post http://localhost:3000/api/auth/login 
{
    "username": "Julieth",
    "password": "Julieth24444"
}

{
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lVXNlciI6Ik1pZ3VlbCBCdXJnb3MiLCJtYWlsVXNlciI6Im1pZ2J1cmxAZ21haWwuY29tIiwiaWF0IjoxNzM2MzgwODIyLCJleHAiOjE3MzYzODQ0MjJ9.9ng-LULinP8mRvsIZsnoVi_YaZzJxEjMzHSTQs0YaRw"
    },
    "message": "Usuario Validado"
}


******************************************************
*
******************************************************


post http://localhost:3000/api/auth/register

Body / row 

{
  "username": "Julieth",
  "password": "Julieth24444",
  "email": "Julieth@xyz.com",
  "fechaNacimiento": "1998-08-15"
}

201 Created
{
    "code": 201,
    "data": {
        "username": "Julieth",
        "password": "$2b$10$ao9orh5GZPr8A9ODmD6jauEGmV4jTLEtgDG3Bs5eZZuxPxTqn27da",
        "email": "Julieth@xyz.com",
        "fechaNacimiento": "1998-08-15",
        "fechaCreacion": "2025-01-08T23:57:34.110Z",
        "fechaModificacion": "2025-01-08T23:57:34.110Z"
    },
    "message": "Usuario creado con éxito"
}

******************************************************
*
******************************************************

GET http://localhost:3000/api/auth/users/Julieth


{
    "code": 200,
    "data": {
        "username": "Julieth",
        "password": "$2b$10$ao9orh5GZPr8A9ODmD6jauEGmV4jTLEtgDG3Bs5eZZuxPxTqn27da",
        "email": "Julieth@xyz.com",
        "fechaNacimiento": "1998-08-15",
        "fechaCreacion": "2025-01-08T23:57:34.110Z",
        "fechaModificacion": "2025-01-08T23:57:34.110Z"
    },
    "message": "Usuario encontrado con éxito"
}

******************************************************
*
******************************************************

JSON

  {
    "username": "Julieth",
    "password": "$2b$10$ao9orh5GZPr8A9ODmD6jauEGmV4jTLEtgDG3Bs5eZZuxPxTqn27da",
    "email": "Julieth@xyz.com",
    "fechaNacimiento": "1998-08-15",
    "fechaCreacion": "2025-01-08T23:57:34.110Z",
    "fechaModificacion": "2025-01-08T23:57:34.110Z"
  }


*/
