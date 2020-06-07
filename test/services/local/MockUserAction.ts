import { UserModel } from "../../../src/database/users/usersModel";
import { ShareModel } from "../../../src/database/shares/sharesModel";

export class MockUserAction {
	public static async BuyShares(n: number, sym: string, userId: string): Promise<boolean> {
		const promises = await Promise.all([UserModel.findOneOrCreate({ uId: userId })]);
		const data = { user: promises[0], symbolCost: 1 };
		const success = await data.user.removeUserCapital({ cost: data.symbolCost * n });
		if (success) {
			const sharesInDb = await ShareModel.findOneOrCreate({ symbol: sym, uId: userId });
			await sharesInDb.addShares({ numberOfShares: n });
			return true;
		}
		return false;
	}

	public static async SellShares(n: number, sym: string, userId: string): Promise<boolean> {
		const promises = await Promise.all([ShareModel.findOneOrCreate({ uId: userId, symbol: sym })]);
		const data = { shareData: promises[0], symbolCost: 1 };
		const success = await data.shareData.sellShares({ numberOfShares: n });
		if (success) {
			const user = await UserModel.findOneOrCreate({ uId: userId });
			await user.addUserCapital({ amountToAdd: n * data.symbolCost });
			return true;
		}
		return false;
    }
    
    public static async SellAllShares(sym: string, userId: string): Promise<boolean> {
		const shareDoc = await ShareModel.findOneOrCreate({ uId: userId, symbol: sym });
		const shareNum = shareDoc.shares;
		return this.SellShares(shareNum, sym, userId);
	}
}
