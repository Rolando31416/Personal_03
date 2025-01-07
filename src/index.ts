import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./environments/env";

// ? Rutas del proyecto
import authRoutes from "./modules/auth/routes";
import { ValidationError } from "express-validation";

const app = express();

// ? Configuracion de JSON para del proyecto 
app.use(express.json());

const prefix: string = "/api";

// ? Deficion de rutas por modulos
app.use(`${prefix}/auth`, authRoutes)

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
    if (err instanceof ValidationError) {
      return res.status(err.statusCode).json(err)
    }
  
    return res.status(500).json(err)
 } as any)

const port: number = Number(PORT);
app.listen(port, () => {
    console.log('El servidor esta levantado en el puerto:', port);
});
