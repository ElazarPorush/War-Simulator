import Attacks from "../models/attack"

export const getAttacksList = async () => {
    try {
        return await Attacks.find()
    } catch (err) {
        console.log(err)
        throw new Error("Sorry but there is a problem to load the list: " + err)
    }
}