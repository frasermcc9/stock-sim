import { Test, TestSuite, expect, BeforeAll, BeforeEach, beforeAll } from "testyts";
import { UserModel } from "../../src/database/users/usersModel";
import { connect, disconnect } from "../../src/database/database";

@TestSuite()
export class TestDatabase {
	private users = [
		{ discordId: "111", capital: 1000, shares: new Map<string, number>() },
		{ discordId: "112", capital: 500, shares: new Map<string, number>() },
		{ discordId: "113", capital: 1000, shares: new Map<string, number>() },
		{ discordId: "114", capital: 500, shares: new Map<string, number>() },
		{ discordId: "115", capital: 1000, shares: new Map<string, number>() },
		{ discordId: "116", capital: 500, shares: new Map<string, number>() },
		{ discordId: "117", capital: 1000, shares: new Map<string, number>() },
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
