import { Socket } from "socket.io"
import {io} from '../app'
import { AttackDTO } from "../types/Dto/attackDto"
import missiles from '../data/missiles.json'
import Attack from "../models/attack"
import { MissileDTO } from "../types/Dto/missileDto"
import { DecreaseDTO } from "../types/Dto/decreaseDto"
import User from "../models/user"

export const handleConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", ()=>{
        console.log("Bye bye user")
    })

    client.on('attack', async (attack: AttackDTO) => {
        const missile: MissileDTO = missiles.find(msl => msl.name === attack.missileName)!
        const newAttack = new Attack({
            ...attack,
            timeToLeft: missile.speed
        })
        await newAttack.save()
        io.emit("handle attack")
    })

    client.on("decrease missile", async (decrease: DecreaseDTO) => {
        await User.findByIdAndUpdate({_id: decrease.user_id, "organization.resources.name": decrease.missileName}, {
            $dec: {
                "organization.resources.$.name": 1,
            }
          });
    })
}