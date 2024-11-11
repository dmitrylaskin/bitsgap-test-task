import { SvgIcon } from "@mui/material";
import cn from "classnames";

import styles from "./AddIcon.module.scss";

interface Props {
    className?: string;
    onClick: () => void;
}

function AddIcon({ className, onClick }: Props) {
    return (
        <SvgIcon
            width={24}
            height={24}
            className={cn(className, styles.root)}
            viewBox="0 0 16 16"
            onClick={onClick}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15Z"
                className={styles.circle}
            />
            <path
                d="M8 5V11M5 8H11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                className={styles.plus}
            />
        </SvgIcon>
    );
}

export { AddIcon };
