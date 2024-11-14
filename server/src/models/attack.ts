import { Schema, Document, model } from "mongoose"
import { StatusAttack } from "../types/statusAttack"

export interface IAttack extends Document {
    _id: string
    missileName: string
    from: string
    to: string
    timeToLeft: number
    status: string
}

const attackSchema = new Schema<IAttack>({
    missileName: {
        type: String,
        required: [true, "missile name is required"]
    },
    from: {
        type: String,
        required: [true, "I need to know from where is it coming"]
    },
    to: {
        type: String,
        required: [true, "I need to know where to send this missile"]
    },
    timeToLeft: {
        type: Number,
        required: [true, "How much time left?"]
    },
    status: {
        type: String,
        default: StatusAttack.Launched
    },
    
})

export default model("Attack", attackSchema)