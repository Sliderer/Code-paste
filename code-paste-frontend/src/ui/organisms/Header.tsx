import SearchBar from "../atoms/header/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/header/CreateResourceButton";
import { Box, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../styling/styles/ElementStyles";

const Header = () => {
  const navigate = useNavigate();
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

  const navigateToResourceCreationPage = () => {
    navigate(`/create_resource`);
  };

  return (
    <Box className={stylingProps.styles.headerPanel}>
      <Stack direction={"row"} spacing={10}>
        <SearchBar stylingProps={stylingProps} />
        <CreateResourceButton
          stylingProps={stylingProps}
          onClick={navigateToResourceCreationPage}
        />
        <HeaderProfilePanel />
      </Stack>
    </Box>
  );
};

export default Header;
