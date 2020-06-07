import { model } from "mongoose";
import { IUserDocument, IUserModel } from "./usersTypes";
import UserSchema from "./usersSchema";
export const UserModel = model<IUserDocument>("users", UserSchema) as IUserModel;
