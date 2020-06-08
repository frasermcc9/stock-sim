export declare class UserAction {
    static BuyShares(n: number, sym: string, userId: string): Promise<boolean>;
    static BuySharesReturnSharePrice(n: number, sym: string, userId: string): Promise<{
        success: boolean;
        price: number;
    }>;
    static SellShares(n: number, sym: string, userId: string): Promise<boolean>;
    static SellAllShares(sym: string, userId: string): Promise<boolean>;
}
//# sourceMappingURL=UserAction.d.ts.map