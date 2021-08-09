import {connect, ConnectOptions, MongooseOptions} from "mongoose"
import * as dotenv from "dotenv";
import {MongoClientOptions} from "mongodb";

dotenv.config()
let MONGO_URL: string
if (process.env.MONGO_URL) {
    MONGO_URL = process.env.MONGO_URL
} else {
    throw new Error("MONGO_URL environment variable is not set")
}
interface Opts extends MongooseOptions {}

const opts: Opts & Partial<ConnectOptions> = {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}

export const connectFunction = async () => {
    try {
        await connect(MONGO_URL, <ConnectOptions>opts, async () => {
            console.log("Connected to db!")
        })
    } catch (e) {
        console.log(e)
    }
}