export declare class TestDatabase {
    private users;
    start(): Promise<void>;
    addUsersToDatabase(): Promise<void>;
    closeDb(): void;
    testAddingRegistries(): Promise<void>;
    testAddingCapital(): Promise<void>;
    testRemoveCapital(): Promise<void>;
    testLastUpdated(): Promise<void>;
    testUserBuysShares(): Promise<void>;
    testUserBuyExpensiveShares(): Promise<void>;
    testUserSellsShares(): Promise<void>;
    testUserSellsTooManyShares(): Promise<void>;
    testSellAll(): Promise<void>;
}
//# sourceMappingURL=TestUser.d.ts.map