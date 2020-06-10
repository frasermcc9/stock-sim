"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sharesModel_1 = require("../../database/shares/sharesModel");
const usersModel_1 = require("../../database/users/usersModel");
const Symbol_1 = require("../api/Symbol");
class UserAction {
    constructor(userId) {
        this.stockCache = new Map();
        this.holdingsCache = new Map();
        this.userId = userId;
    }
    async BuySharesReturnSharePrice(toSpend, sym) {
        toSpend = Math.abs(toSpend);
        sym = sym.toUpperCase();
        const promises = await Promise.all([usersModel_1.UserModel.findOneOrCreate({ uId: this.userId }), new Symbol_1.Symbol(sym).CurrentPrice()]);
        const data = { user: promises[0], symbolCost: promises[1] };
        const success = await data.user.removeUserCapital({ cost: toSpend });
        if (success) {
            const sharesInDb = await sharesModel_1.ShareModel.findOneOrCreate({ symbol: sym, uId: this.userId });
            await sharesInDb.addShares({ numberOfShares: toSpend / data.symbolCost });
            return { success: true, price: data.symbolCost };
        }
        return { success: false, price: data.symbolCost };
    }
    async SellShares(n, sym) {
        sym = sym.toUpperCase();
        const promises = await Promise.all([sharesModel_1.ShareModel.findOneOrCreate({ uId: this.userId, symbol: sym }), new Symbol_1.Symbol(sym).CurrentPrice()]);
        const data = { shareData: promises[0], symbolCost: promises[1] };
        const success = await data.shareData.sellShares({ numberOfShares: n });
        if (success) {
            const user = await usersModel_1.UserModel.findOneOrCreate({ uId: this.userId });
            await user.addUserCapital({ amountToAdd: n * data.symbolCost });
            return { success: true, price: data.symbolCost };
        }
        return { success: false, price: data.symbolCost };
    }
    async SellAllShares(sym) {
        sym = sym.toUpperCase();
        const shareDoc = await sharesModel_1.ShareModel.findOneOrCreate({ uId: this.userId, symbol: sym });
        const shareNum = shareDoc.shares;
        const sellObject = await this.SellShares(shareNum, sym);
        const returnObject = {
            success: sellObject.success,
            price: sellObject.price,
            holding: shareNum,
        };
        return returnObject;
    }
    async CacheMarketValues() {
        const records = await sharesModel_1.ShareModel.allHeldByUser({ uId: this.userId });
        records.forEach(async (el) => {
            this.holdingsCache.set(el.symbol, el.shares);
        });
        this.stockCache = await UserAction.SymbolValueMapFromDocument(records);
        return new Map(this.stockCache);
    }
    /**
     * Refreshes both caches
     */
    async RefreshUserCache() {
        return this.CacheMarketValues();
    }
    /**
     * alias for the RefreshUserCache() command
     */
    async SetUserCache() {
        return this.CacheMarketValues();
    }
    /**
     * Returns a map of symbols and their market prices. Uses iex API.
     * @param records
     */
    static async SymbolValueMapFromDocument(records) {
        const SymbolValue = new Map();
        records.forEach(async (shareDoc) => {
            const s = new Symbol_1.Symbol(shareDoc.symbol);
            SymbolValue.set(s.symbol, await s.CurrentPrice());
        });
        return SymbolValue;
    }
    /**
     * Must SetCache() before use
     */
    NetAssetWorth() {
        let value = 0;
        this.holdingsCache.forEach((shares, holding) => {
            const marketValue = this.stockCache.get(holding);
            if (marketValue == undefined)
                throw new Error("Error: Cache must be set before using NetAssetWorth()");
            value += marketValue * shares;
        });
        return value;
    }
    async FreeCapital() {
        return (await usersModel_1.UserModel.findOneOrCreate({ uId: this.userId })).capital;
    }
}
exports.UserAction = UserAction;
//# sourceMappingURL=UserAction.js.map