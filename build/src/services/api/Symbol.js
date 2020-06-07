"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = require("./BaseService");
class Symbol extends BaseService_1.BaseService {
    constructor(symbol) {
        super();
        this._symbol = symbol;
    }
    async CurrentPrice() {
        return (await this.iex.symbol(this._symbol).quote()).latestPrice;
    }
    async FullQuote() {
        return this.iex.symbol(this._symbol).quote();
    }
    async CompanyProfile() {
        return this.iex.symbol(this._symbol).company();
    }
    async CompanyLogo() {
        return this.iex.symbol(this._symbol).logo();
    }
}
exports.Symbol = Symbol;
//# sourceMappingURL=Symbol.js.map