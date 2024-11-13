import { Socket } from "socket.io"
import {io} from '../app'

export const handleConnection = (client: Socket) => {
    console.log(`[socket.io] New Connection ${client.id}`)
    client.on("disconnect", ()=>{
        console.log("Bye bye user")
    })
}