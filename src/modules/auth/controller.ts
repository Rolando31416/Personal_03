import { Request } from "express";
import { UserI, ICredencial } from "../../interfaces/Auth.interface";
import { AuthServices } from "./services";

export const RegisterController = async (req: Request) => {
    try {
        const {username, password, email, fechaNacimiento, fechaCreacion, fechaModificacion} = req.body as UserI;

        if (!username || !password || !email || !fechaNacimiento) {
            throw new Error ("Campos : username, password, email, fechaNacimiento son obligatorios");
        }

        const _fechaNacimiento = new Date();
        const _fechaCreacion= new Date(); 
        const _fechaModificacion= new Date();


        return await new AuthServices().registerService(
            username, 
            password, 
            email,
            _fechaNacimiento, 
            _fechaCreacion, 
            _fechaModificacion
        );

    } catch (error) {
        throw error
    }
}

export const LoginController = async (req: Request) => {
    try{
        const {username, password} = req.body as ICredencial
        return await new AuthServices().loginService(username, password)
    }catch (error){
        throw error
    }

}



