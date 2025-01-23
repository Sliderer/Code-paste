import { Box, CircularProgress, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";

const LoadingPanel = ({progress} : {progress?: number}) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    return <Box className={styles.centerPanel}>
        <CircularProgress value={10} size={150} thickness={1}/>
    </Box>
}

export default LoadingPanel;