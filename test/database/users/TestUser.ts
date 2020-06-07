import { Test, TestSuite, expect, BeforeAll, BeforeEach, beforeEach, AfterAll, TestResult } from "testyts";
import { UserModel } from "../../../src/database/users/usersModel";
import { connect, disconnect } from "../TestDatabase";

@TestSuite()
export class TestDatabase {
	private users: Array<{ uId: string; capital: number }> = new Array();

	@BeforeAll()
	async createUsers() {
		connect();
		this.users = [
			{ uId: "100", capital: 1000 },
			{ uId: "200", capital: 500 },
			{ uId: "300", capital: 1000 },
			{ uId: "400", capital: 500 },
			{ uId: "500", capital: 1000 },
		];
	}

	@beforeEach()
	async addUsersToDatabase() {
		await UserModel.deleteMany({});
		for (const user of this.users) {
			await UserModel.create(user);
		}
	}

	@AfterAll()
	async disconnect() {
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
}
