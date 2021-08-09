import express from "express"
const { renderHome, register } = require("./controllers/userController")
export const router = express.Router()
import registerMiddleware from "./middlewars/registerMiddleware"
import {login} from "./controllers/userController";

router.get("/", renderHome)
router.post("/register", registerMiddleware, register)
router.post("/login", login)