import styles from './InfoTooltip.module.scss';
import { Typography } from "@mui/material";
import { QuestionTooltip } from "../../../shared/components/QuestionTooltip/QuestionTooltip.tsx";

const InfoTooltip = () => {
    return (
        <div className={styles.infoTooltip}>
            <QuestionTooltip message="Take Profit description"/>
            <Typography variant="body2" sx={{fontSize: '14px', color: 'white'}}>Take Profit</Typography>
        </div>
    );
};

export { InfoTooltip };