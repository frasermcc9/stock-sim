"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const testyts_1 = require("testyts");
const usersModel_1 = require("../../../src/database/users/usersModel");
const sharesModel_1 = require("../../../src/database/shares/sharesModel");
const database_1 = require("../../../src/database/database");
const Client_1 = require("../../../src/Client");
let TestUserAction = class TestUserAction {
    constructor() {
        this.users = new Array();
    }
    async start() {
        database_1.disconnect();
        Client_1.Client.CreateClient({
            dbName: "stocksimTest",
            iexKey: "pk_5cc14fd9e06d4e8abb255b42995f4d06",
            uri: "mongodb://localhost:27017",
            marketHoursOnly: false,
            newUserValue: 1000,
        });
        database_1.connect();
        this.users = [
            { uId: "100", capital: 1000 },
            { uId: "200", capital: 500 },
            { uId: "300", capital: 1000 },
            { uId: "400", capital: 500 },
            { uId: "500", capital: 1000 },
        ];
    }
    async addUsersToDatabase() {
        await usersModel_1.UserModel.deleteMany({});
        await sharesModel_1.ShareModel.deleteMany({});
        for (const user of this.users) {
            await usersModel_1.UserModel.create(user);
        }
    }
    async finish() {
        database_1.disconnect();
    }
    async testFail() {
        testyts_1.expect.toBeEqual(1, 0);
    }
};
__decorate([
    testyts_1.BeforeAll()
], TestUserAction.prototype, "start", null);
__decorate([
    testyts_1.beforeEach()
], TestUserAction.prototype, "addUsersToDatabase", null);
__decorate([
    testyts_1.AfterAll()
], TestUserAction.prototype, "finish", null);
__decorate([
    testyts_1.Test("Fail")
], TestUserAction.prototype, "testFail", null);
TestUserAction = __decorate([
    testyts_1.TestSuite()
], TestUserAction);
exports.TestUserAction = TestUserAction;
//# sourceMappingURL=TestUserAction.js.map