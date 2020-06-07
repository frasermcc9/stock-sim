"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseService_1 = require("../../../src/services/api/BaseService");
class MockSymbol extends BaseService_1.BaseService {
    constructor(symbol) {
        super();
        this._symbol = symbol;
    }
    CurrentPrice() {
        return 10;
    }
    FullQuote() { }
    CompanyProfile() { }
    CompanyLogo() { }
}
exports.MockSymbol = MockSymbol;
//# sourceMappingURL=MockSymbol.js.map