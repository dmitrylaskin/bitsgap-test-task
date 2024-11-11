import { observer } from "mobx-react";

import { QuestionTooltip } from "shared/components/QuestionTooltip/QuestionTooltip";
import { Button } from "shared/components/Button/Button";
import { NumberInput } from "shared/components/NumberInput/NumberInput";

import { BASE_CURRENCY, QUOTE_CURRENCY } from "./constants";
import { useStore } from "./context";
import { PlaceOrderTypeSwitch } from "./components/PlaceOrderTypeSwitch/PlaceOrderTypeSwitch";
import { TakeProfit } from "./components/TakeProfit/TakeProfit";

import styles from "./PlaceOrderForm.module.scss";
import React from "react";
import { OrderSide } from "./model.ts";

export const PlaceOrderForm = observer(() => {
    const {
        activeOrderSide,
        price,
        total,
        amount,
        setPrice,
        setAmount,
        setTotal,
        setOrderSide,
        validateProfitTargets,
        setIsTakeProfitActive,
        clearProfitTargets,
        updateAllTargetPrices,
        clearErrors
    } = useStore();

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        validateProfitTargets();
    };

    const handlePriceChange = (value: number | null) => {
        setPrice(Number(value));
        setIsTakeProfitActive(false);
        clearProfitTargets();
        clearErrors();
    };

    const handleAmountChange = (value: number | null) => {
        setAmount(Number(value));
        setIsTakeProfitActive(false);
        clearProfitTargets();
        clearErrors();
    };

    const handleTypeSwitchChange = (orderSide: OrderSide) => {
        setOrderSide(orderSide);
        updateAllTargetPrices();
        clearErrors();
    };
    return (
        <form className={styles.root}>
            <div className={styles.label}>
                Market direction{" "}
                <QuestionTooltip message="Market direction description"/>
            </div>
            <div className={styles.content}>
                <div className={styles.typeSwitch}>
                    <PlaceOrderTypeSwitch
                        activeOrderSide={activeOrderSide}
                        onChange={handleTypeSwitchChange}
                    />
                </div>
                <NumberInput
                    label={`Price, ${QUOTE_CURRENCY}`}
                    value={price}
                    onChange={handlePriceChange}
                />
                <NumberInput
                    value={amount}
                    label={`Amount, ${BASE_CURRENCY}`}
                    onChange={handleAmountChange}
                />
                <NumberInput
                    value={total}
                    label={`Total, ${QUOTE_CURRENCY}`}
                    onChange={(value) => setTotal(Number(value))}
                />
                <TakeProfit/>
                <div className={styles.submit}>
                    <Button
                        color={activeOrderSide === "buy" ? "green" : "red"}
                        type="submit"
                        fullWidth
                        onClick={handleSubmit}
                    >
                        {activeOrderSide === "buy"
                            ? `Buy ${BASE_CURRENCY}`
                            : `Sell ${QUOTE_CURRENCY}`}
                    </Button>
                </div>
            </div>
        </form>
    );
});
