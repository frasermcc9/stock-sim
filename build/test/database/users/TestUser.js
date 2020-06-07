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
const database_1 = require("../../../src/database/database");
const Client_1 = require("../../../src/Client");
const MockUserAction_1 = require("../../services/local/MockUserAction");
const sharesModel_1 = require("../../../src/database/shares/sharesModel");
let TestDatabase = class TestDatabase {
    constructor() {
        this.users = new Array();
    }
    async start() {
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
        for (const user of this.users) {
            await usersModel_1.UserModel.create(user);
        }
    }
    closeDb() {
        database_1.disconnect();
    }
    async testAddingRegistries() {
        const usersInDb = await usersModel_1.UserModel.find();
        testyts_1.expect.toBeEqual(usersInDb.length, this.users.length);
    }
    async testAddingCapital() {
        const user = await usersModel_1.UserModel.findOne({ uId: "100" });
        const loss = 10;
        testyts_1.expect.toBeTruthy(user);
        const expectedMoney = user.capital - 10;
        await user.removeUserCapital({ cost: loss });
        testyts_1.expect.toBeEqual(user.capital, expectedMoney);
    }
    async testRemoveCapital() {
        const user = await usersModel_1.UserModel.findOne({ uId: "300" });
        const gain = 25;
        testyts_1.expect.toBeTruthy(user);
        const expectedMoney = user.capital + 25;
        await user.addUserCapital({ amountToAdd: gain });
        testyts_1.expect.toBeEqual(user.capital, expectedMoney);
    }
    async testLastUpdated() {
        const user = await usersModel_1.UserModel.findOne({ uId: "500" });
        testyts_1.expect.toBeTruthy(user);
        const beforeUpdateTime = user.lastUpdated;
        await user.addUserCapital({ amountToAdd: 1 });
        const postUpdateTime = user.lastUpdated;
        testyts_1.expect.toBeTruthy(beforeUpdateTime < postUpdateTime);
    }
    async testUserBuysShares() {
        await MockUserAction_1.MockUserAction.BuyShares(500, "msft", "200");
        const user = await usersModel_1.UserModel.findOneOrCreate({ uId: "200" });
        testyts_1.expect.toBeEqual(user.capital, 0);
    }
    async testUserBuyExpensiveShares() {
        await MockUserAction_1.MockUserAction.BuyShares(501, "msft", "200");
        const user = await usersModel_1.UserModel.findOneOrCreate({ uId: "200" });
        testyts_1.expect.toBeEqual(user.capital, 500);
    }
    async testUserSellsShares() {
        const share = await sharesModel_1.ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
        await share.addShares({ numberOfShares: 500 });
        await MockUserAction_1.MockUserAction.SellShares(500, "msft", "200");
        const user = await usersModel_1.UserModel.findOneOrCreate({ uId: "200" });
        testyts_1.expect.toBeEqual(user.capital, 1000);
    }
    async testUserSellsTooManyShares() {
        const share = await sharesModel_1.ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
        await share.addShares({ numberOfShares: 500 });
        await MockUserAction_1.MockUserAction.SellShares(501, "msft", "200");
        const user = await usersModel_1.UserModel.findOneOrCreate({ uId: "200" });
        testyts_1.expect.toBeEqual(user.capital, 500);
    }
    async testSellAll() {
        const share = await sharesModel_1.ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
        await share.addShares({ numberOfShares: 500 });
        await MockUserAction_1.MockUserAction.SellAllShares("msft", "200");
        const user = await usersModel_1.UserModel.findOneOrCreate({ uId: "200" });
        testyts_1.expect.toBeEqual(user.capital, 1000);
        const newShare = await sharesModel_1.ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
        testyts_1.expect.toBeEqual(newShare.shares, 0);
    }
};
__decorate([
    testyts_1.BeforeAll()
], TestDatabase.prototype, "start", null);
__decorate([
    testyts_1.BeforeEach()
], TestDatabase.prototype, "addUsersToDatabase", null);
__decorate([
    testyts_1.AfterAll()
], TestDatabase.prototype, "closeDb", null);
__decorate([
    testyts_1.Test("Adding users")
], TestDatabase.prototype, "testAddingRegistries", null);
__decorate([
    testyts_1.Test("Adding capital to user")
], TestDatabase.prototype, "testAddingCapital", null);
__decorate([
    testyts_1.Test("Removing capital from user")
], TestDatabase.prototype, "testRemoveCapital", null);
__decorate([
    testyts_1.Test("Check if adjusting capital adjusts last updated entry")
], TestDatabase.prototype, "testLastUpdated", null);
__decorate([
    testyts_1.Test("User buying shares")
], TestDatabase.prototype, "testUserBuysShares", null);
__decorate([
    testyts_1.Test("User buys shares that can't be afforded")
], TestDatabase.prototype, "testUserBuyExpensiveShares", null);
__decorate([
    testyts_1.Test("User selling shares")
], TestDatabase.prototype, "testUserSellsShares", null);
__decorate([
    testyts_1.Test("User sells shares they don't have")
], TestDatabase.prototype, "testUserSellsTooManyShares", null);
__decorate([
    testyts_1.Test("Sell all shares in a company")
], TestDatabase.prototype, "testSellAll", null);
TestDatabase = __decorate([
    testyts_1.TestSuite()
], TestDatabase);
exports.TestDatabase = TestDatabase;
//# sourceMappingURL=TestUser.js.map