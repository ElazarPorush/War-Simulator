import { hash } from "bcrypt"
import { RegisterDTO } from "../types/Dto/registerDto"
import User from "../models/user"
import { IOrganization } from "../types/Dto/organization"
import organizations from '../data/organizations.json'

export const addUser = async (user: RegisterDTO) => {
    try {
        console.log(user.username)
        const encPass = await hash(user.password, 10)
        const organization: IOrganization = organizations.find(org => org.name === user.organization)!
        const newUser = new User({
            username: user.username,
            password: encPass,
            organization: organization
        })
        return await newUser.save()
    } catch (err) {
        throw new Error(`Error accured while creating this user: ${err}`)
    }
}