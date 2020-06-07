import { Document, Model } from "mongoose";

export interface IUser {
	uId: String;
	capital: number;
	dateOfEntry?: Date;
	lastUpdated?: Date;
}

export interface IUserDocument extends IUser, Document {
	setLastUpdated: (this: IUserDocument) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
	findOneOrCreate: (this: IUserModel, { uId, capital }: { uId: string; capital: number }) => Promise<IUserDocument>;
	removeUserCapital(this: IUserDocument, cost: number): Promise<boolean>;
}
