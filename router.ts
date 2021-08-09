import express from "express";
import {renderHome, register, logout} from "./controllers/userController";
import registerMiddleware from "./middlewars/registerMiddleware";
import {login} from "./controllers/userController";
const router = express.Router();

router.get("/", renderHome);
router.post("/register", registerMiddleware, register);
router.post("/login", login);
router.post("/logout", logout)

export default router;