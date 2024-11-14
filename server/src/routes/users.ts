import { Request, Response } from "express";
import { RegisterDTO } from "../types/Dto/registerDto"
import { addUser, userLogin } from "../services/users";


export const register = async (req: Request<any, any, RegisterDTO>, res: Response) => {
    try {
        console.log(req.body)
        const newUser = await addUser(req.body)
        res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(400).json((err as Error).message)
    }   
}

export const login = async (req: Request, res: Response) => {
    try {
      console.log(req.body)
      const loggedUser = await userLogin(req.body)
      res.status(200).json(loggedUser)
    } catch (err) {
      res.status(400).json((err as Error).message)
    }
  };