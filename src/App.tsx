import { PlaceOrder } from "PlaceOrder";

import styles from "./App.module.scss";
import { createTheme, ThemeProvider } from "@mui/material";

export default function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#2b273b',
            },
        },
    });

    return (
        <div className={styles.app}>
            <div className={styles.form}>
                <ThemeProvider theme={darkTheme}>
                    <PlaceOrder/>
                </ThemeProvider>
            </div>
        </div>
    );
}
