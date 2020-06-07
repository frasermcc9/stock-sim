import { Test, TestSuite, expect, BeforeAll, BeforeEach, beforeAll } from "testyts";
import { UserModel } from "../../src/database/users/usersModel";
import { connect, disconnect } from "../../src/database/database";

@TestSuite()
export class TestDatabase {
	private users = [
		{ uId: "111", capital: 1000 },
		{ uId: "112", capital: 500 },
		{ uId: "113", capital: 1000 },
		{ uId: "114", capital: 500 },
		{ uId: "115", capital: 1000 },
		{ uId: "116", capital: 500 },
		{ uId: "117", capital: 1000 },
	];

	@Test("Adding users")
	async testAddingRegistries() {
		connect();
		try {
			for (const user of this.users) {
				await UserModel.create(user);
			}
			disconnect();
		} catch (e) {
			console.error(e);
		}
	}
}
