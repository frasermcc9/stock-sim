"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = require("./BaseService");
class Crypto extends BaseService_1.BaseService {
    constructor(symbol) {
        super();
        this._symbol = symbol.toUpperCase();
    }
    async CurrentPrice() {
        return Number((await this.iex.crypto(this._symbol + "usd").quote()).latestPrice);
    }
    async FullQuote() {
        return this.iex.crypto(this._symbol).quote();
    }
}
exports.Crypto = Crypto;
//# sourceMappingURL=Crypto.js.map