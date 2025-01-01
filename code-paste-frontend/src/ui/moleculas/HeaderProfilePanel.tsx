import React from 'react';
import { Box, useTheme } from "@mui/material";
import HeaderProfilePanelIcon from "../atoms/HeaderProfilePanelIcon";
import { useStyles } from '../styling/styles/ElementStyles';

const HeaderProfilePanel = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    return <>
        <HeaderProfilePanelIcon/>
        <Box className={classes.textStyle}>Nickname</Box>
    </>
}

export default HeaderProfilePanel;