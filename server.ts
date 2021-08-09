import express, {Express, urlencoded} from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import {router} from "./router";
import {connectFunction} from "./models/db";
const MongoStore = require("connect-mongo")(session)
import session from "express-session";
import * as mongoose from "mongoose";

dotenv.config()
const app: Express = express()
const PORT = process.env.PORT
const HOST = process.env.HOST
const SESSION_SECRET = process.env.SESSION_SECRET

let sessionOptions = session({
    secret: typeof SESSION_SECRET === "string" ? SESSION_SECRET : "",
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(urlencoded({extended: false}));
app.use(sessionOptions)
app.use(express.json())
app.use(router)
app.use(cors())
app.use(express.static("public"))

app.set("views", "views")
app.set("view engine", "ejs")

app.listen(PORT, (): void => {
    console.log(`App has been started on ${HOST}:${PORT}`)
    connectFunction()
})