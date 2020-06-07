import { model } from "mongoose";
import { IUserDocument } from "./usersTypes";
import UserSchema from "./usersSchema";
export const UserModel = model<IUserDocument>("user", UserSchema);

