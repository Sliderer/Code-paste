import React from 'react';
import { Box, useTheme } from "@mui/material";
import HeaderProfilePanelIcon from "../atoms/HeaderProfilePanelIcon";
import { useStyles } from '../styling/styles/ElementStyles';

const HeaderProfilePanel = () => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return <Box sx={{marginRight: 10}}>
        <HeaderProfilePanelIcon/>
    </Box>
}

export default HeaderProfilePanel;