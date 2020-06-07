import { IUserDocument, IUserModel } from "./usersTypes";
import { Client } from "../../client";

export async function findOneOrCreate(this: IUserModel, id: string): Promise<IUserDocument> {
	const record = await this.findOne({ uId: id });
	if (record) {
		return record;
	} else {
		return this.create({ uId: id, capital: Client.getClient().newUserValue });
	}
}
