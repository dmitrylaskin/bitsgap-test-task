import React from "react";
import styles from './Error.module.scss'

const ErrorsList: React.FC<{errors: Array<string> }> = ({errors}) => {
    return (
        <ul className={styles.errorsWrapper}>
            {errors.map(error => (<li key={error} className={styles.error}><span>{error}</span></li>))}
        </ul>
    )
};

export { ErrorsList };