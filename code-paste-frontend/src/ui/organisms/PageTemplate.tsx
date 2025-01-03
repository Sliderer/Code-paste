import Header from "./Header";
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '../styling/themes';
import { ReactNode } from "react";

const PageTemplate = ({page}: {page: ReactNode}) => {
    return <ThemeProvider theme={lightTheme}>
        <Header/>
        {page}
    </ThemeProvider>
}

export default PageTemplate;