export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface DbIUser extends IUser {
    _id: string;
}

export interface TokenData {
    token: string;
    expiresIn: number;
}

declare module "express-session" {
    export interface Session {
        user: {
            [key:string]:string
        };
    }
}