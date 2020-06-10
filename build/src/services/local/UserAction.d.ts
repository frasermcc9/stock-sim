export declare class UserAction {
    /**
     * @deprecated
     */
    static BuyShares(numOfShares: number, sym: string, userId: string): Promise<boolean>;
    static BuySharesReturnSharePrice(toSpend: number, sym: string, userId: string): Promise<{
        success: boolean;
        price: number;
    }>;
    static SellShares(n: number, sym: string, userId: string): Promise<{
        success: boolean;
        price: number;
    }>;
    static SellAllShares(sym: string, userId: string): Promise<{
        success: boolean;
        price: number;
    }>;
}
//# sourceMappingURL=UserAction.d.ts.map