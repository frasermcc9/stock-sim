import { IShareDocument, IShareModel } from "./sharesTypes";

export async function findOneOrCreate(this: IShareModel, { uId, symbol }: { uId: string; symbol: string }): Promise<IShareDocument> {
	const record = await this.findOne({ uId: uId, symbol: symbol });
	if (record) {
		return record;
	} else {
		return this.create({ uId: uId, shares: 0, symbol: symbol });
	}
}

export async function allHeldByUser(this: IShareModel, { uId }: { uId: string }): Promise<IShareDocument[]> {
	const records = await this.find({ uId: uId });
	if (records) {
		return records;
	}
	return [];
}
