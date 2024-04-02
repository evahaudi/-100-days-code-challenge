import React from 'react'
import MyAppBar from './MyAppBar'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

const Layout = () => {
    const [theme, colorMode] = useMode();
    return (
        <div>
            <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <MyAppBar />
                </ThemeProvider>
            </ColorModeContext.Provider>
        </div>
    )
}

export default Layout
