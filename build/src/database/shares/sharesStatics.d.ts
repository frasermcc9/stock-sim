import { IShareDocument, IShareModel } from "./sharesTypes";
export declare function findOneOrCreate(this: IShareModel, { uId, symbol }: {
    uId: string;
    symbol: string;
}): Promise<IShareDocument>;
export declare function allHeldByUser(this: IShareModel, { uId }: {
    uId: string;
}): Promise<IShareDocument[]>;
//# sourceMappingURL=sharesStatics.d.ts.map