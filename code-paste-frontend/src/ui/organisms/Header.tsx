import SearchBar from "../atoms/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/CreateResourceButton";
import { Box, Grid2, Stack, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";

const Header = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box className={styles.headerPanel}>
        <SearchBar />
        <CreateResourceButton />
        <HeaderProfilePanel />
    </Box>
  );
};

export default Header;
