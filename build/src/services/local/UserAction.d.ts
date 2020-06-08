export declare class UserAction {
    /**
     * @deprecated
     */
    static BuyShares(numOfShares: number, sym: string, userId: string): Promise<boolean>;
    static BuySharesReturnSharePrice(toSpend: number, sym: string, userId: string): Promise<{
        success: boolean;
        price: number;
    }>;
    static SellShares(n: number, sym: string, userId: string): Promise<boolean>;
    static SellAllShares(sym: string, userId: string): Promise<boolean>;
}
//# sourceMappingURL=UserAction.d.ts.map