import { Request, Response } from "express"
import { getAttacksList } from "../services/attacks"

export const getAttacks = async (req: Request, res: Response) => {
    try {
        const attacks = await getAttacksList()
        res.status(200).json(attacks)
    } catch (err) {
        console.log(err)
        res.status(400).json((err as Error).message)
    }   
}