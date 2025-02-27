import { Box, Button, Stack, TextField } from "@mui/material";
import StylingProps from "../../../helpers/StylingProps";

const SearchBar = ({ stylingProps }: { stylingProps: StylingProps }) => {
  return (
    <Stack direction={"row"} sx={{ justifyContent: "center" }}>
      <Box className={stylingProps.styles.searchBar}>
        <TextField
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
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
      >
        Найти
      </Button>
    </Stack>
  );
};

export default SearchBar;
