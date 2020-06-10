import { ShareModel } from "../../database/shares/sharesModel";
import { UserModel } from "../../database/users/usersModel";
import { Symbol } from "../api/Symbol";
import { Interface } from "readline";

export class UserAction {
	/**
	 * @deprecated
	 */
	public static async BuyShares(numOfShares: number, sym: string, userId: string): Promise<boolean> {
		numOfShares = Math.abs(numOfShares);
		sym = sym.toUpperCase();
		const promises = await Promise.all([UserModel.findOneOrCreate({ uId: userId }), new Symbol(sym).CurrentPrice()]);
		const data = { user: promises[0], symbolCost: promises[1] };
		const success = await data.user.removeUserCapital({ cost: data.symbolCost * numOfShares });
		if (success) {
			const sharesInDb = await ShareModel.findOneOrCreate({ symbol: sym, uId: userId });
			await sharesInDb.addShares({ numberOfShares: numOfShares });
			return true;
		}
		return false;
	}

	public static async BuySharesReturnSharePrice(toSpend: number, sym: string, userId: string): Promise<ITradeShares> {
		toSpend = Math.abs(toSpend);
		sym = sym.toUpperCase();
		const promises = await Promise.all([UserModel.findOneOrCreate({ uId: userId }), new Symbol(sym).CurrentPrice()]);
		const data = { user: promises[0], symbolCost: promises[1] };
		const success = await data.user.removeUserCapital({ cost: toSpend });
		if (success) {
			const sharesInDb = await ShareModel.findOneOrCreate({ symbol: sym, uId: userId });
			await sharesInDb.addShares({ numberOfShares: toSpend / data.symbolCost });
			return { success: true, price: data.symbolCost };
		}
		return { success: false, price: data.symbolCost };
	}

	public static async SellShares(n: number, sym: string, userId: string): Promise<ITradeShares> {
		sym = sym.toUpperCase();
		const promises = await Promise.all([ShareModel.findOneOrCreate({ uId: userId, symbol: sym }), new Symbol(sym).CurrentPrice()]);
		const data = { shareData: promises[0], symbolCost: promises[1] };
		const success = await data.shareData.sellShares({ numberOfShares: n });
		if (success) {
			const user = await UserModel.findOneOrCreate({ uId: userId });
			await user.addUserCapital({ amountToAdd: n * data.symbolCost });
			return { success: true, price: data.symbolCost };
		}
		return { success: false, price: data.symbolCost };
	}

	public static async SellAllShares(sym: string, userId: string): Promise<ISellAllShares> {
		sym = sym.toUpperCase();
		const shareDoc = await ShareModel.findOneOrCreate({ uId: userId, symbol: sym });
		const shareNum = shareDoc.shares;
		const sellObject = await this.SellShares(shareNum, sym, userId);
		const returnObject: ISellAllShares = {
			success: sellObject.success,
			price: sellObject.price,
			holding: shareNum,
		};
		return returnObject;
	}
}

export interface ITradeShares {
	success: boolean;
	price: number;
}
export interface ISellAllShares extends ITradeShares {
	holding: number;
}
