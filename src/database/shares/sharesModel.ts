import { model } from "mongoose";
import { IShareModel, IShareDocument } from "./sharesTypes";
import UserSchema from "./sharesSchema";
export const ShareModel = model<IShareDocument>("user", UserSchema) as IShareModel;
