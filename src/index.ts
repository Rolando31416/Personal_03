import express, { NextFunction, Request, Response } from "express";
import { PORT } from "./environments/env";

// ? Rutas del proyecto
import authRoutes from "./modules/auth/routes";
import { ValidationError } from "express-validation";
import db from "./config/dbOrm"

const app = express();

// ? Configuracion de JSON para del proyecto 
app.use(express.json());

// ? coneccion con la BD 


async function main() {
try {
  await db.authenticate();
  await db.sync({force:true}); // ! La sincronizacion con el force entrue, puede eliminar registros o columnas
  console.log('Connection establecida con la BD.');
} catch (error) {
  console.error('Ocurrio un error al conectarse co la BD', error);
 }
}
main()


//try {
//  await sequelize.authenticate();
//  console.log('Connection has been established successfully.');
//} catch (error) {
//  console.error('Unable to connect to the database:', error);
//}

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
