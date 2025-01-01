import React from 'react';
import SearchBar from "../atoms/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/CreateResourceButton";
import { Stack, useTheme } from "@mui/material";
import { useStyles } from '../styling/styles/ElementStyles';

const Header = () => {
    const theme = useTheme();
    const styles = useStyles(theme);

    return <Stack direction={"column"} sx={{margin: 5}}>
        <Stack spacing={20} direction={"row"} justifyContent={"center"} className={styles.headerPanel}>
            <SearchBar />
            <CreateResourceButton />
            <HeaderProfilePanel />
        </Stack>
    </Stack>
}

export default Header;