import { ShareModel } from "../../database/shares/sharesModel";
import { UserModel } from "../../database/users/usersModel";
import { Symbol } from "../api/Symbol";
import { Interface } from "readline";
import { IShareDocument } from "../../database/shares/sharesTypes";

export class UserAction {
	private userId: string;
	private stockCache = new Map<string, number>();
	private holdingsCache = new Map<string, number>();

	constructor(userId: string) {
		this.userId = userId;
	}

	public async BuySharesReturnSharePrice(toSpend: number, sym: string): Promise<ITradeShares> {
		toSpend = Math.abs(toSpend);
		sym = sym.toUpperCase();
		const promises = await Promise.all([UserModel.findOneOrCreate({ uId: this.userId }), new Symbol(sym).CurrentPrice()]);
		const data = { user: promises[0], symbolCost: promises[1] };
		const success = await data.user.removeUserCapital({ cost: toSpend });
		if (success) {
			const sharesInDb = await ShareModel.findOneOrCreate({ symbol: sym, uId: this.userId });
			await sharesInDb.addShares({ numberOfShares: toSpend / data.symbolCost });
			return { success: true, price: data.symbolCost };
		}
		return { success: false, price: data.symbolCost };
	}

	public async SellShares(n: number, sym: string): Promise<ITradeShares> {
		sym = sym.toUpperCase();
		const promises = await Promise.all([ShareModel.findOneOrCreate({ uId: this.userId, symbol: sym }), new Symbol(sym).CurrentPrice()]);
		const data = { shareData: promises[0], symbolCost: promises[1] };
		const success = await data.shareData.sellShares({ numberOfShares: n });
		if (success) {
			const user = await UserModel.findOneOrCreate({ uId: this.userId });
			await user.addUserCapital({ amountToAdd: n * data.symbolCost });
			return { success: true, price: data.symbolCost };
		}
		return { success: false, price: data.symbolCost };
	}

	public async SellAllShares(sym: string): Promise<ISellAllShares> {
		sym = sym.toUpperCase();
		const shareDoc = await ShareModel.findOneOrCreate({ uId: this.userId, symbol: sym });
		const shareNum = shareDoc.shares;
		const sellObject = await this.SellShares(shareNum, sym);
		const returnObject: ISellAllShares = {
			success: sellObject.success,
			price: sellObject.price,
			holding: shareNum,
		};
		return returnObject;
	}

	public async CacheMarketValues(): Promise<Map<string, number>> {
		const records = await ShareModel.allHeldByUser({ uId: this.userId });
		records.forEach(async (el) => {
			this.holdingsCache.set(el.symbol, el.shares);
		});
		this.stockCache = await UserAction.SymbolValueMapFromDocument(records);
		return new Map(this.stockCache);
	}
	/**
	 * Refreshes both caches
	 */
	public async RefreshUserCache(): Promise<Map<string, number>> {
		return this.CacheMarketValues();
	}
	/**
	 * alias for the RefreshUserCache() command
	 */
	public async SetUserCache(): Promise<Map<string, number>> {
		return this.CacheMarketValues();
	}

	/**
	 * Returns a map of symbols and their market prices. Uses iex API.
	 * @param records
	 */
	private static async SymbolValueMapFromDocument(records: IShareDocument[]): Promise<Map<string, number>> {
		const SymbolValue = new Map<string, number>();
		records.forEach(async (shareDoc) => {
			const s = new Symbol(shareDoc.symbol);
			SymbolValue.set(s.symbol, await s.CurrentPrice());
		});
		return SymbolValue;
	}

	/**
	 * Must SetCache() before use
	 */
	public NetAssetWorth(): number {
		let value = 0;
		this.holdingsCache.forEach((shares, holding) => {
			const marketValue = this.stockCache.get(holding);
			if (marketValue == undefined) throw new Error("Error: Cache must be set before using NetAssetWorth()");
			value += marketValue * shares;
		});
		return value;
	}
}

interface ITradeShares {
	success: boolean;
	price: number;
}
interface ISellAllShares extends ITradeShares {
	holding: number;
}
