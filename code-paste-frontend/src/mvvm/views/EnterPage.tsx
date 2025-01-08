import { observer } from "mobx-react";
import { EnterViewModel } from "../view_models/EnterViewModel";
import { useTheme } from "@emotion/react";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { Box, Stack, Typography } from "@mui/material";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";

const EnterPage = observer(
  ({ viewModel }: { viewModel: EnterViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
      <Box
        display="flex"
        justifyContent="center"
        textAlign={"center"}
        alignItems="center"
        minHeight="100vh"
      >
        <Stack>
          <Typography className={styles.headerStyle} sx={{fontSize: 30, fontFamily: "Montserrat Alternates"}}>Вход</Typography>
          <Box className={styles.settingsPanel} sx={{ width: "10vw" }}>
            <Stack spacing={5}>
              <SettingsTextInput placeholder="E-mail" />
              <SettingsTextInput placeholder="Пароль" type="password" />
            </Stack>
          </Box>
        </Stack>
      </Box>
    );
  }
);

export default EnterPage;
