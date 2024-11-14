import { Request, Response } from "express";
import { RegisterDTO } from "../types/Dto/registerDto"
import { addUser, getUserProfile, userLogin } from "../services/users";
import { LoginDTO } from "../types/Dto/loginDto";


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

export const login = async (req: Request<any, any, LoginDTO>, res: Response) => {
    try {
      console.log(req.body)
      const loggedUser = await userLogin(req.body)
      res.status(200).json(loggedUser)
    } catch (err) {
      res.status(400).json((err as Error).message)
    }
  };

export const getProfile = async (req: Request<any, any, LoginDTO>, res: Response) => {
    try {
      console.log(req.body)
      const user = await getUserProfile(req.body)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json((err as Error).message)
    }
  };