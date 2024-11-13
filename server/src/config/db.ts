import { connect } from "mongoose";

export const connectToMongo = async () => {
    try {
        connect(process.env.DB_URL as string)
        console.log(`connected to mongo`)
    } catch (err) {
        console.log("can't connect to mongo", err)
    }
}