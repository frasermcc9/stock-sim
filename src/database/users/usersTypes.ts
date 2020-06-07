import { Document, Model } from "mongoose";

export interface IUser {
	uId: String;
	capital: number;
	dateOfEntry?: Date;
	lastUpdated?: Date;
}

export interface IUserDocument extends IUser, Document {
	setLastUpdated: (this: IUserDocument) => Promise<void>;
	removeUserCapital: (this: IUserDocument, { cost }: { cost: number }) => Promise<boolean>;
	addUserCapital: (this: IUserDocument, { amountToAdd }: { amountToAdd: number }) => Promise<void>;
}

export interface IUserModel extends Model<IUserDocument> {
	findOneOrCreate: (this: IUserModel, { uId }: { uId: string }) => Promise<IUserDocument>;
}
