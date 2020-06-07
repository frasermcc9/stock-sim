"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("../../Client");
async function findOneOrCreate({ id }) {
    const record = await this.findOne({ uId: id });
    if (record) {
        return record;
    }
    else {
        return this.create({ uId: id, capital: Client_1.Client.getClient().newUserValue });
    }
}
exports.findOneOrCreate = findOneOrCreate;
//# sourceMappingURL=userStatics.js.map