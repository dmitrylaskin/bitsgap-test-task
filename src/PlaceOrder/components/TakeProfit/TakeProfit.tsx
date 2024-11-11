import styles from './TakeProfit.module.scss';
import { InfoTooltip } from "../InfoTooltip/InfoTooltip.tsx";
import { observer } from "mobx-react";
import { useStore } from "../../context.tsx";
import { Switch } from "../../../shared/components/Switch/Switch.tsx";
import { TakeProfitTable } from "../TakeProfitTable/TakeProfitTable.tsx";
import { AddIcon } from "../../../shared/components/AddIcon/AddIcon.tsx";
import { ErrorsList } from "../Error/ErrorsList.tsx";

const TakeProfit = observer(() => {
    const {
        isTakeProfitActive,
        setIsTakeProfitActive,
        setProfitTargets,
        addProfitTargets,
        clearProfitTargets,
        price,
        profitTargets,
        calculateAmountToCell,
        getProjectedProfit,
        errors,
    } = useStore();

    const handleSwitchChange = () => {
        setIsTakeProfitActive(!isTakeProfitActive);

        if (!isTakeProfitActive) {
            addProfitTargets({ profit: 2, targetPrice: price * (1 + (2 / 100)), amountToCell: 100 });
        } else {
            clearProfitTargets();
        }
    };

    const handleAddIconClick = () => {
        if (!profitTargets.length) {
            setProfitTargets({
                profit: 2,
                targetPrice: price * (1 + (2 / 100)),
                amountToCell: 20
            });
            return;
        }

        const last = profitTargets[profitTargets.length - 1]

        const profit = last.profit + 2;

        setProfitTargets({
            profit: last.profit + 2,
            targetPrice: price * (1 + (profit / 100)),
            amountToCell: 20
        });

        calculateAmountToCell();
    };

    return (
        <div className={styles.takeProfit}>
            <div className={styles.header}>
                <InfoTooltip/>
                <Switch checked={isTakeProfitActive} onChange={handleSwitchChange}/>
            </div>
            {isTakeProfitActive && (
                <>
                    <TakeProfitTable/>
                    {errors.length > 0 && <ErrorsList errors={errors}/>}
                    {profitTargets.length < 5 && (
                        <div className={styles.addProfitTarget}>
                            <AddIcon onClick={handleAddIconClick}/>
                            <span>Add profit target {profitTargets.length > 0 && `${profitTargets.length}/5`}</span>
                        </div>
                    )}

                    <div className={styles.projectProfit}>
                        <div className={styles.projectProfitTitle}>Project profit</div>
                        <div className={styles.projectProfitValue}>
                            {getProjectedProfit.toFixed(2)}
                            <span className={styles.projectProfitCurrency}>USDT</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
});

export { TakeProfit };
