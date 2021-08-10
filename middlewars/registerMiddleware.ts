import {NextFunction, Request, Response} from "express";

const registerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {username, email, password} = req.body;
    if (!username || !email || !password) {
        req.flash("error", "Fill in the input fields!")
        res.redirect("/")
        return
    }
    const isEmail:RegExp = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    if (!isEmail.test(email)) {
        req.flash("error", "Invalid email!")
        res.redirect("/")
        return
    }
    if (password.length > 16) {
        req.flash("error", "Maximum password length 16 characters!")
        res.redirect("/")
    } else if (password.length < 4) {
        req.flash("error", "Minimum password length 4 characters!")
        res.redirect("/")
        return
    }
    next();
}

export default registerMiddleware;