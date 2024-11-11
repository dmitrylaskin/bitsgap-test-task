export type OrderSide = "buy" | "sell";

export interface IProfitTarget {
    profit: number;
    targetPrice: number;
    amountToCell: number;
}

export enum EProfitTargetFields {
    PROFIT = "profit",
    TARGET_PRICE = "targetPrice",
    AMOUNT_TO_CELL = "amountToCell",
}