import React from 'react';
import { Box, Stack, Typography, useTheme } from "@mui/material";
import HeaderProfilePanelIcon from "../atoms/HeaderProfilePanelIcon";
import { useStyles } from '../styling/styles/ElementStyles';

const HeaderProfilePanel = () => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return <Stack direction={"row"} sx={{display: "flex", alignItems: "center"}}>
        <HeaderProfilePanelIcon />
        <Typography className={styles.textStyle}>Nickname</Typography>
    </Stack>
}

export default HeaderProfilePanel;