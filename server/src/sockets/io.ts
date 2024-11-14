import { Socket } from "socket.io"
import {io} from '../app'
import { AttackDTO } from "../types/Dto/attackDto"
import missiles from '../data/missiles.json'
import Attack from "../models/attack"
import { MissileDTO } from "../types/Dto/missileDto"
import { DecreaseDTO } from "../types/Dto/decreaseDto"
import User, { IUser } from "../models/user"
import { FindMissileDTO } from "../types/Dto/findMissileDto"

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
            await User.findByIdAndUpdate({_id: decrease.user_id, "organization.resources.name": decrease.missileName}, {
                $dec: {
                    "organization.resources.$.name": 1,
                }
              });
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
}