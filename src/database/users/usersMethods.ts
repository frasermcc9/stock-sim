import { Document } from "mongoose";
import { IUserDocument } from "./usersTypes";

export async function setLastUpdated(this: IUserDocument): Promise<void> {
	const now = new Date();
	if (!this.lastUpdated || this.lastUpdated < now) {
		this.lastUpdated = now;
		await this.save();
	}
}

export async function removeUserCapital(this: IUserDocument, { cost }: { cost: number }): Promise<boolean> {
	if (this.capital >= cost) {
		this.capital -= cost;
		await this.save();
		await this.setLastUpdated();
		return true;
	} else {
		return false;
	}
}

export async function addUserCapital(this: IUserDocument, { amountToAdd }: { amountToAdd: number }): Promise<void> {
	this.capital += amountToAdd;
	await this.save();
	await this.setLastUpdated();
}
