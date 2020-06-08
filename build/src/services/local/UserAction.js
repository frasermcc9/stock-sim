"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usersModel_1 = require("../../database/users/usersModel");
const Symbol_1 = require("../api/Symbol");
const sharesModel_1 = require("../../database/shares/sharesModel");
class UserAction {
    static async BuyShares(n, sym, userId) {
        const promises = await Promise.all([usersModel_1.UserModel.findOneOrCreate({ uId: userId }), new Symbol_1.Symbol(sym).CurrentPrice()]);
        const data = { user: promises[0], symbolCost: promises[1] };
        const success = await data.user.removeUserCapital({ cost: data.symbolCost * n });
        if (success) {
            const sharesInDb = await sharesModel_1.ShareModel.findOneOrCreate({ symbol: sym, uId: userId });
            await sharesInDb.addShares({ numberOfShares: n });
            return true;
        }
        return false;
    }
    static async BuySharesReturnSharePrice(n, sym, userId) {
        const promises = await Promise.all([usersModel_1.UserModel.findOneOrCreate({ uId: userId }), new Symbol_1.Symbol(sym).CurrentPrice()]);
        const data = { user: promises[0], symbolCost: promises[1] };
        const success = await data.user.removeUserCapital({ cost: data.symbolCost * n });
        if (success) {
            const sharesInDb = await sharesModel_1.ShareModel.findOneOrCreate({ symbol: sym, uId: userId });
            await sharesInDb.addShares({ numberOfShares: n });
            return data.symbolCost;
        }
        return false;
    }
    static async SellShares(n, sym, userId) {
        const promises = await Promise.all([sharesModel_1.ShareModel.findOneOrCreate({ uId: userId, symbol: sym }), new Symbol_1.Symbol(sym).CurrentPrice()]);
        const data = { shareData: promises[0], symbolCost: promises[1] };
        const success = await data.shareData.sellShares({ numberOfShares: n });
        if (success) {
            const user = await usersModel_1.UserModel.findOneOrCreate({ uId: userId });
            await user.addUserCapital({ amountToAdd: n * data.symbolCost });
            return true;
        }
        return false;
    }
    static async SellAllShares(sym, userId) {
        const shareDoc = await sharesModel_1.ShareModel.findOneOrCreate({ uId: userId, symbol: sym });
        const shareNum = shareDoc.shares;
        return this.SellShares(shareNum, sym, userId);
    }
}
exports.UserAction = UserAction;
//# sourceMappingURL=UserAction.js.map