import { IShareDocument, IShareModel } from "./sharesTypes";
import { Client } from "../../Client";

export async function findOneOrCreate(this: IShareModel, { id, shareSymbol }: { id: string; shareSymbol: string }): Promise<IShareDocument> {
	const record = await this.findOne({ uId: id, symbol: shareSymbol });
	if (record) {
		return record;
	} else {
		return this.create({ uId: id, shares: 0, symbol: shareSymbol });
	}
}
