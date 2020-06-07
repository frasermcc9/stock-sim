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
async function removeUserCapital({ cost }) {
    if (this.capital >= cost) {
        this.capital -= cost;
        await this.save();
        await this.setLastUpdated();
        return true;
    }
    else {
        return false;
    }
}
exports.removeUserCapital = removeUserCapital;
async function addUserCapital({ amountToAdd }) {
    this.capital += amountToAdd;
    await this.save();
    await this.setLastUpdated();
}
exports.addUserCapital = addUserCapital;
//# sourceMappingURL=usersMethods.js.map