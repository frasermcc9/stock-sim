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
async function allHeldByUser({ uId }) {
    const records = await this.find({ uId: uId });
    if (records) {
        return records;
    }
    return [];
}
exports.allHeldByUser = allHeldByUser;
//# sourceMappingURL=sharesStatics.js.map