import { Schema, Types, Document, model } from "mongoose"
import { IOrganization } from "../types/organization"

export interface IUser extends Document {
    username: string
    password: string
    organization: IOrganization
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    organization: {
        type: {
            name: String,
            resources: {
                type: [
                    {
                        name: String,
                        amount: Number
                    }
                ]
            },
            budget: Number
        },
        required: [true, "organization is required"]
    }
})

export default model("User", userSchema)