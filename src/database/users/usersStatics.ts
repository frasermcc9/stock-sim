import { IUserDocument, IUserModel } from "./usersTypes";
import { Client } from "../../Client";

export async function findOneOrCreate(this: IUserModel, { uId }: { uId: string }): Promise<IUserDocument> {
	const record = await this.findOne({ uId: uId });
	if (record) {
		return record;
	} else {
		return this.create({ uId: uId, capital: Client.getClient().newUserValue });
	}
}
