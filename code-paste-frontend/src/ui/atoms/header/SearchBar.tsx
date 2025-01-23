import { Box, Button, Stack, TextField, useTheme } from "@mui/material";
import { useStyles } from "../../styling/styles/ElementStyles";

const SearchBar = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Stack direction={"row"} sx={{ justifyContent: "center"}}>
      <Box className={styles.searchBar}>
        <TextField
          variant="standard"
          slotProps={{
            input: {
              disableUnderline: true,
            },
          }}
          sx={{ paddingLeft: 1, paddingRight: 1, width: "95%"}}
        />
      </Box>
      <Button className={styles.searchButton} sx={{ color: theme.palette.primary.dark, backgroundColor: theme.palette.primary.main, minWidth: "140px"}}>Найти</Button>
    </Stack>
  );
};

export default SearchBar;
