import { Socket } from "socket.io"
import {io} from '../app'
import { AttackDTO } from "../types/Dto/attackDto"
import missiles from '../data/missiles.json'
import Attack from "../models/attack"
import { MissileDTO } from "../types/Dto/missileDto"

export const handleConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", ()=>{
        console.log("Bye bye user")
    })

    client.on('attack', (attack: AttackDTO) => {
        const missile: MissileDTO = missiles.find(msl => msl.name === attack.missileName)!
        const newAttack = new Attack({
            ...attack,
            timeToLeft: missile.speed
        })
        newAttack.save()
        io.emit("handle attack")
    })
}