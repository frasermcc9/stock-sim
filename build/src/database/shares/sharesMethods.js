"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function setLastUpdated() {
    const now = new Date();
    if (!this.lastUpdated || this.lastUpdated < now) {
        this.lastUpdated = now;
        await this.save();
    }
}
exports.setLastUpdated = setLastUpdated;
/**
 * @param this
 * @param numberOfShares
 * @returns whether the operation was successful
 */
async function sellShares({ numberOfShares }) {
    if (this.shares >= numberOfShares) {
        this.shares -= numberOfShares;
        await this.save();
        return true;
    }
    else {
        return false;
    }
}
exports.sellShares = sellShares;
/**
 * @param this
 * @param numberOfShares
 * @returns the new number of shares
 */
async function addShares({ numberOfShares }) {
    this.shares += numberOfShares;
    await this.save();
    return this.shares;
}
exports.addShares = addShares;
//# sourceMappingURL=sharesMethods.js.map