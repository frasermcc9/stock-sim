import { Test, TestSuite, expect, BeforeAll, BeforeEach, beforeEach, AfterAll, TestResult } from "testyts";
import { UserModel } from "../../../src/database/users/usersModel";
import { connect, disconnect } from "../../../src/database/database";
import { Client } from "../../../src/Client";
import { MockUserAction } from "../../services/local/MockUserAction";
import { ShareModel } from "../../../src/database/shares/sharesModel";

@TestSuite()
export class TestDatabase {
	private users: Array<{ uId: string; capital: number }> = new Array();

	@BeforeAll()
	async start() {
		Client.CreateClient({
			dbName: "stocksimTest",
			iexKey: "pk_5cc14fd9e06d4e8abb255b42995f4d06",
			uri: "mongodb://localhost:27017",
			marketHoursOnly: false,
			newUserValue: 1000,
		});
		connect();
		this.users = [
			{ uId: "100", capital: 1000 },
			{ uId: "200", capital: 500 },
			{ uId: "300", capital: 1000 },
			{ uId: "400", capital: 500 },
			{ uId: "500", capital: 1000 },
		];
	}

	@BeforeEach()
	async addUsersToDatabase() {
		await UserModel.deleteMany({});
		for (const user of this.users) {
			await UserModel.create(user);
		}
	}

	@AfterAll()
	closeDb() {
		disconnect();
	}

	@Test("Adding users")
	async testAddingRegistries() {
		const usersInDb = await UserModel.find();
		expect.toBeEqual(usersInDb.length, this.users.length);
	}

	@Test("Adding capital to user")
	async testAddingCapital() {
		const user = await UserModel.findOne({ uId: "100" });
		const loss = 10;
		expect.toBeTruthy(user);

		const expectedMoney = user!.capital - 10;
		await user!.removeUserCapital({ cost: loss });
		expect.toBeEqual(user!.capital, expectedMoney);
	}

	@Test("Removing capital from user")
	async testRemoveCapital() {
		const user = await UserModel.findOne({ uId: "300" });
		const gain = 25;
		expect.toBeTruthy(user);

		const expectedMoney = user!.capital + 25;
		await user!.addUserCapital({ amountToAdd: gain });
		expect.toBeEqual(user!.capital, expectedMoney);
	}

	@Test("Check if adjusting capital adjusts last updated entry")
	async testLastUpdated() {
		const user = await UserModel.findOne({ uId: "500" });
		expect.toBeTruthy(user);

		const beforeUpdateTime = user!.lastUpdated!;
		await user!.addUserCapital({ amountToAdd: 1 });
		const postUpdateTime = user!.lastUpdated!;

		expect.toBeTruthy(beforeUpdateTime < postUpdateTime);
	}

	@Test("User buying shares")
	async testUserBuysShares() {
		await MockUserAction.BuyShares(500, "msft", "200");
		const user = await UserModel.findOneOrCreate({ uId: "200" });
		expect.toBeEqual(user.capital, 0);
	}

	@Test("User buys shares that can't be afforded")
	async testUserBuyExpensiveShares() {
		await MockUserAction.BuyShares(501, "msft", "200");
		const user = await UserModel.findOneOrCreate({ uId: "200" });
		expect.toBeEqual(user.capital, 500);
	}

	@Test("User selling shares")
	async testUserSellsShares() {
		const share = await ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
		await share.addShares({ numberOfShares: 500 });

		await MockUserAction.SellShares(500, "msft", "200");
		const user = await UserModel.findOneOrCreate({ uId: "200" });
		expect.toBeEqual(user.capital, 1000);
	}

	@Test("User sells shares they don't have")
	async testUserSellsTooManyShares() {
		const share = await ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
		await share.addShares({ numberOfShares: 500 });

		await MockUserAction.SellShares(501, "msft", "200");
		const user = await UserModel.findOneOrCreate({ uId: "200" });
		expect.toBeEqual(user.capital, 500);
	}

	@Test("Sell all shares in a company")
	async testSellAll() {
		const share = await ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
		await share.addShares({ numberOfShares: 500 });

		await MockUserAction.SellAllShares("msft", "200");
		const user = await UserModel.findOneOrCreate({ uId: "200" });
		expect.toBeEqual(user.capital, 1000);
		const newShare = await ShareModel.findOneOrCreate({ uId: "200", symbol: "msft" });
		expect.toBeEqual(newShare.shares, 0);
	}
}
