"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function findOneOrCreate({ uId, symbol }) {
    const record = await this.findOne({ uId: uId, symbol: symbol });
    if (record) {
        return record;
    }
    else {
        return this.create({ uId: uId, shares: 0, symbol: symbol });
    }
}
exports.findOneOrCreate = findOneOrCreate;
//# sourceMappingURL=sharesStatics.js.map