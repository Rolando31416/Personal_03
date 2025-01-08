import { Joi } from "express-validation";

export const loginValidation = {
    body: Joi.object({
      username: Joi.string().min(5).required(),
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
    }),
  }

  export const userValidation = {
    body: Joi.object({            
      username: Joi.string().min(5).required(),      
      password: Joi.string().regex(/[a-zA-Z0-9]{3,30}/).required(),
      email: Joi.string().email().required(),      
      fechaNacimiento: Joi.date().iso().min("1950-01-01").max("now").required()
  }),

 }
  