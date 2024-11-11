import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './TakeProfit.module.scss'
import { CloseIcon } from "../../../shared/components/CloseIcon/CloseIcon.tsx";
import { observer } from "mobx-react";
import { useStore } from "../../context.tsx";
import { tableCellConfig, tableConfig, tableContainerConfig } from "./Const.ts";
import React from "react";
import { EProfitTargetFields } from "../../model.ts";

export const TakeProfitTable = observer(() => {
    const { profitTargets, removeProfitTargets, updateProfitTargets, updateTargetPrice, changeProfitTarget, activeOrderSide } = useStore()

    const handleProfitChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        changeProfitTarget(idx, EProfitTargetFields.PROFIT, event.target.value)
    };

    const handleProfitBlur = (event: React.FocusEvent<HTMLInputElement>, idx: number) => {
        updateProfitTargets(idx, Number(event.target.value))
    };

    const handleTargetPriceChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        changeProfitTarget(idx, EProfitTargetFields.TARGET_PRICE, event.target.value)
    };

    const handleTargetPriceBlur = (event: React.FocusEvent<HTMLInputElement>, idx: number) => {
        updateTargetPrice(idx, Number(event.target.value))
    };

    const handleAmountToCellChange = (event: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        changeProfitTarget(idx, EProfitTargetFields.AMOUNT_TO_CELL, event.target.value)
    };


    return (
        <TableContainer component={Paper} sx={tableContainerConfig}>
            <Table size="small" aria-label="a dense table" sx={tableConfig}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{...tableCellConfig, width: '20%', }}>Profit</TableCell>
                        <TableCell sx={{...tableCellConfig, width: '35%', }}>Target price</TableCell>
                        <TableCell sx={{...tableCellConfig, width: '25%', whiteSpace: 'nowrap', }}>
                            {activeOrderSide === 'buy' ? 'Amount to sell' : 'Amount to buy'}
                        </TableCell>
                        <TableCell sx={{...tableCellConfig, width: '10%', }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {profitTargets?.map((row, idx) => (
                        <TableRow
                            key={idx}
                        >
                            <TableCell component="th" scope="row" >
                                <div className={styles.profitCell}>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={Number.isInteger(row.profit) ? row.profit.toFixed(0) : 0}
                                        onChange={(event) => handleProfitChange(event, idx)}
                                        onBlur={(event) => handleProfitBlur(event, idx)}
                                    />
                                    <span className={styles.sign}>%</span>
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className={styles.targetPrice}>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={row.targetPrice.toFixed(0)}
                                        onChange={(event) => handleTargetPriceChange(event, idx)}
                                        onBlur={(event) => handleTargetPriceBlur(event, idx)}
                                    />
                                    <span className={styles.sign}>USDT</span>
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className={styles.amountCell}>
                                    <input
                                        className={styles.input}
                                        type="number"
                                        value={row.amountToCell.toString()}
                                        onChange={(event) => handleAmountToCellChange(event, idx)}
                                    />
                                    <span className={styles.sign}>%</span>
                                </div>
                            </TableCell>
                            <TableCell >
                                <div className={styles.iconWrapper}>
                                    <CloseIcon onClick={() => {
                                        removeProfitTargets(idx)
                                    }} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
})