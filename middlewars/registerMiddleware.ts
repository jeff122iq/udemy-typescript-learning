import {NextFunction, Request, Response} from "express";

const registerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({error: "Fill in the input fields!"})
    }
    const isEmail:RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (!isEmail.test(email)) {
        return res.status(401).json({error: "Invalid email!"})
    }
    if (password.length > 16) {
        return res.status(401).json({error: "Maximum password length 16 characters"})
    } else if (password.length < 4) {
        return res.status(401).json({error: "Minimum password length 4 characters"})
    }
    next();
}

export default registerMiddleware;