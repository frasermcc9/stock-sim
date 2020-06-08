import { model } from "mongoose";
import { IShareModel, IShareDocument } from "./sharesTypes";
import ShareSchema from "./sharesSchema";
export const ShareModel = model<IShareDocument>("shares", ShareSchema) as IShareModel;
