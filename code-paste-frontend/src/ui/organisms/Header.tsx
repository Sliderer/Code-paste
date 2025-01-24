import SearchBar from "../atoms/header/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/header/CreateResourceButton";
import { Box, Grid2, Stack, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigate = useNavigate();  

  const navigateToResourceCreationPage = () => {
    console.log('redi')
    navigate(`/create_resource`)
  }

  return (
    <Box className={styles.headerPanel}>
      <Stack direction={"row"} spacing={10}>
        <SearchBar />
        <CreateResourceButton onClick={navigateToResourceCreationPage} />
        <HeaderProfilePanel />
      </Stack>
    </Box>
  );
};

export default Header;
