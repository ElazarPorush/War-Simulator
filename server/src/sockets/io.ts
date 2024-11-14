import { Socket } from "socket.io"
import {io} from '../app'
import { AttackDTO } from "../types/Dto/attackDto"
import missiles from '../data/missiles.json'
import Attack, { IAttack } from "../models/attack"
import { MissileDTO } from "../types/Dto/missileDto"
import { DecreaseDTO } from "../types/Dto/decreaseDto"
import User, { IUser } from "../models/user"
import { FindMissileDTO } from "../types/Dto/findMissileDto"
import { StatusAttack } from "../types/statusAttack"

export const handleConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", ()=>{
        console.log("Bye bye user")
    })

    client.on('attack', async (attack: AttackDTO) => {
        try {
            const missile: MissileDTO = missiles.find(msl => msl.name === attack.missileName)!
            const newAttack = new Attack({
                ...attack,
                timeToLeft: missile.speed
            })
            await newAttack.save()
            io.emit("fetch attacks")
        } catch (err) {
            throw new Error((err as Error).message)
        }
    })

    client.on("decrease missile", async (decrease: DecreaseDTO) => {
        try {
            // const user: IUser = await User.find({_id: decrease.user_id})!
            // for (const rocket of user.organization.resources) {
            //     if (rocket.name === decrease.missileName){
            //         rocket.amount = rocket.amount - 1
            //         break
            //     }
            // }
            // user.save()
        } catch (err) {
            console.log(err)
            throw new Error((err as Error).message)
        }
    })

    client.on("find missile to defend", async (findMissile: FindMissileDTO) => {
        const user: IUser = await User.findById(findMissile.user_id) as IUser

        let sum = 0
        let finalMissile = ""
        for (const missile of user.organization.resources) {
            const missileDefend: MissileDTO = missiles.find(msl => msl.name === missile.name) as MissileDTO
            if (findMissile.missileSpeed >= missileDefend.speed) {
                if (missileDefend.speed >= sum){
                    sum = missileDefend.speed
                    finalMissile = missileDefend.name
                }
            }
        }
        client.emit("update missile defend", finalMissile)
    })

    client.on("set status", async (attack_id: string) => {
        try {
            // const attacks: IAttack[] = await Attack.find()
            // const attack = attacks.find(atc => atc._id === attack_id)!
            // const newAttack: IAttack = attack
            // newAttack.timeToLeft = 0
            // newAttack.status = StatusAttack.Hit
            // newAttack.save()
            // io.emit("fetch attacks")
        } catch (error) {
            throw error
        }
    })
}