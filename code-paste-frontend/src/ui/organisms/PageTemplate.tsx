import Header from "./Header";
import { ThemeProvider } from '@mui/material';
import { lightTheme } from '../styling/themes';
import { ReactNode } from "react";

const PageTemplate = ({page, needHeader}: {page: ReactNode, needHeader?: boolean}) => {
    return <ThemeProvider theme={lightTheme}>
        {
            needHeader && <Header/>
        }
        {page}
    </ThemeProvider>
}

export default PageTemplate;