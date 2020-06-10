import { Document, Model } from "mongoose";

export interface IShare {
	symbol: string;
	shares: number;
	uId: string;
	dateOfEntry?: Date;
	lastUpdated?: Date;
}

export interface IShareDocument extends IShare, Document {
	setLastUpdated: (this: IShareDocument) => Promise<void>;
	sellShares: (this: IShareDocument, { numberOfShares }: { numberOfShares: number }) => Promise<boolean>;
	addShares: (this: IShareDocument, { numberOfShares }: { numberOfShares: number }) => Promise<number>;
}

export interface IShareModel extends Model<IShareDocument> {
	findOneOrCreate: (this: IShareModel, { symbol, uId }: { symbol: string; uId: string }) => Promise<IShareDocument>;
	allHeldByUser: (this: IShareModel, { uId }: { uId: string }) => Promise<IShareDocument[]>;
}
