import { IUserDocument } from "./usersTypes";
export declare function setLastUpdated(this: IUserDocument): Promise<void>;
export declare function removeUserCapital(this: IUserDocument, { cost }: {
    cost: number;
}): Promise<boolean>;
export declare function addUserCapital(this: IUserDocument, { amountToAdd }: {
    amountToAdd: number;
}): Promise<void>;
//# sourceMappingURL=usersMethods.d.ts.map