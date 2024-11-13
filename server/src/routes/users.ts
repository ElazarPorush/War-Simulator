import { Request, Response } from "express"
// import { initDataBase, addUser, userLogin } from "../services/users"
// import { LoginDto } from "../types/DTO/user"

export const sid = async (req: Request, res: Response) => {
    try {
        // await initDataBase()
        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
    }
}

export const login = async (req: Request, res: Response) => {
    try {
    //   const loggedUser = await userLogin(req.body)
    //   res.status(200).json(loggedUser)
    } catch (err) {
      res.status(400).json((err as Error).message)
    }
  };
  

export const register = async (req: Request, res: Response) => {
    try {
        // const newUser = await addUser(req.body)
        // res.status(201).json(newUser)
    } catch (err) {
        console.log(err)
        res.status(400).json((err as Error).message)
    }   
}