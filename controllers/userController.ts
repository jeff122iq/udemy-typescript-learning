import {Request, Response} from "express";
import {IUser} from "../types";
import User from "../models/user.model";
import bcrypt from "bcrypt"
import { Document } from 'mongoose';
import * as dotenv from 'dotenv';
import jwt from "jsonwebtoken"
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET

export const renderHome = (req: Request, res: Response): void => {
    if (req.session.user) {
        res.render("home-dashboard", {username: req.session.user.username})
    } else {
        res.render("home-guest")
    }
}

export const register = async (req: Request, res: Response): Promise<object | Error> => {
    try {
        const {username, email, password}: IUser = req.body
        const isPassword = await bcrypt.hash(password, 12)
        const user: IUser = await User.create({
            username: username,
            email: email,
            password: isPassword
        })
        return user
    } catch (e) {
        res.status(400)
        return new Error(e)
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const password = req.body.password
        const user: IUser & Document | null = await User.findOne({email: req.body.email});
        if (!user) {
            console.log("User is unauthorized!")
            res.status(400).send("User is unauthorized!");
        }
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                res.status(400).json({message: "Incorrect password"});
            }
            if (typeof JWT_SECRET === 'string') {
                const AccessToken = jwt.sign(
                    {_id: user._id },
                    JWT_SECRET, {expiresIn: "1h"}
                );
                req.session.user = {favColor: "blue", id: user._id, username: user.username}
                req.session.save(() => {
                    res.redirect("/")
                })
            }
        }
    } catch (e) {
        console.log(e)
    }
}

export const logout = (req:Request, res:Response) => {
    try {
        req.session.destroy((err) => {
            res.redirect("/")
        })
    } catch (e) {
        console.log(e)
    }
}
