import { compare, hash } from "bcrypt"
import { RegisterDTO } from "../types/Dto/registerDto"
import User from "../models/user"
import { IOrganization } from "../types/organization"
import organizations from '../data/organizations.json'
import { LoginDTO } from "../types/Dto/loginDto"
import jwt from 'jsonwebtoken'

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

export const userLogin = async (user: LoginDTO) => {
    try {
      const userFromDatabase = await User.findOne({ username: user.username }).lean();
      if (!userFromDatabase) throw new Error("user not found");
      const match = await compare(user.password, userFromDatabase.password);
      if (!match) throw new Error("wrong password");
      const token = await jwt.sign({
        user_id: userFromDatabase._id,
        username: userFromDatabase.username
      }, process.env.JWT_SECRET as string, {
        expiresIn: "10m"
      })
      return {...userFromDatabase, token, password: "******"};
    } catch (err) {
      throw err;
    }
  };

  export const getUserProfile = async (user: LoginDTO) => {
    try {
      const userFromDatabase = await User.findOne({ username: user.username }).lean();
        if (!userFromDatabase) throw new Error("user not found");
        return {...userFromDatabase, password: "******"}
    } catch (err) {
      throw err
    }
  }