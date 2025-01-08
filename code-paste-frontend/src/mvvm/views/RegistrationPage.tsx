import { observer } from "mobx-react";
import { RegistrationViewModel } from "../view_models/RegistratioinViewModel";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";
const RegistrationPage = observer(
  ({ viewModel }: { viewModel: RegistrationViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
      <div  style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + "/BackgroundSVG.svg"})`, 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundClip: '0px',
      }}>
        <Box
          display="flex"
          justifyContent="center"
          textAlign={"center"}
          alignItems="center"
          minHeight="100vh"
        >
          <Stack>
            <Typography className={styles.headerStyle} sx={{ fontSize: 30 }}>
              Регистрация
            </Typography>
            <Box className={styles.settingsPanel} sx={{background: "white"}}>
              <Stack spacing={5}>
                <SettingsTextInput placeholder="Имя" />
                <SettingsTextInput placeholder="E-mail" />
                <SettingsTextInput placeholder="Пароль" type="password" />
                <Button
                  className={styles.publishButton}
                  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.dark,
                    borderRadius: 2,
                  }}
                >
                  Зарегистрироваться
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    );
  }
);

export default RegistrationPage;
