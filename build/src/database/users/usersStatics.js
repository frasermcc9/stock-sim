"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../Client");
async function findOneOrCreate({ uId }) {
    const record = await this.findOne({ uId: uId });
    if (record) {
        return record;
    }
    else {
        return this.create({ uId: uId, capital: Client_1.Client.getClient().newUserValue });
    }
}
exports.findOneOrCreate = findOneOrCreate;
//# sourceMappingURL=usersStatics.js.map