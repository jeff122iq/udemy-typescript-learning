import * as mongoose from "mongoose";
import {IUser} from "../types";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true},
        email: { type: String, required: true, unique: true  },
        password: { type: String, required: true },
    },
);

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

