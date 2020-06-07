import { Document } from "mongoose";
import { IShareDocument, IShare } from "./sharesTypes";

export async function setLastUpdated(this: IShareDocument): Promise<void> {
	const now = new Date();
	if (!this.lastUpdated || this.lastUpdated < now) {
		this.lastUpdated = now;
		await this.save();
	}
}
/**
 * @param this
 * @param numberOfShares
 * @returns whether the operation was successful
 */
export async function sellShares(this: IShareDocument, { numberOfShares }: { numberOfShares: number }): Promise<boolean> {
	if (this.shares >= numberOfShares) {
		this.shares -= numberOfShares;
		await this.save();
		return true;
	} else {
		return false;
	}
}

/**
 * @param this
 * @param numberOfShares
 * @returns the new number of shares
 */
export async function addShares(this: IShareDocument, { numberOfShares }: { numberOfShares: number }): Promise<number> {
	this.shares += numberOfShares;
	await this.save();
	return this.shares;
}
