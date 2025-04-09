import { Box, Button, Stack, TextField } from "@mui/material";
import StylingProps from "../../../helpers/StylingProps";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ stylingProps }: { stylingProps: StylingProps }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const navigateToSearchPage = () => {
    if (text.length > 0) {
      setText("");
      navigate(`/search/${encodeURIComponent(text)}`);
    }
  };

  return (
    <Stack direction={"row"} sx={{ justifyContent: "center" }}>
      <Box className={stylingProps.styles.searchBar}>
        <TextField
          onChange={(e) => {
            setText(e.target.value);
          }}
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          value={text}
          sx={{ paddingLeft: 1, paddingRight: 1, width: "95%" }}
        />
      </Box>
      <Button
        className={stylingProps.styles.searchButton}
        sx={{
          color: stylingProps.theme.palette.primary.dark,
          backgroundColor: stylingProps.theme.palette.primary.main,
          minWidth: "140px",
        }}
        onClick={navigateToSearchPage}
      >
        Найти
      </Button>
    </Stack>
  );
};

export default SearchBar;
