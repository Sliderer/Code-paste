import { observer } from "mobx-react";
import { EnterViewModel } from "../view_models/EnterViewModel";
import { useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";
import { Link } from "react-router-dom";

const EnterPage = observer(
  ({ viewModel }: { viewModel: EnterViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
      <div  style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + "/BackgroundSVG.svg"})`, 
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundClip: '0px',
        minHeight: "100vh"
      }}>
        <Box className={styles.centerPanel}>
          <Stack>
            <Typography className={styles.headerStyle} sx={{ fontSize: 30, textAlign: "center" }}>
              Вход
            </Typography>
            <Box className={styles.settingsPanel} sx={{background: "white"}}>
              <Stack spacing={4}>
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
                  Войти
                </Button>
                <Link style={{color: theme.palette.primary.light, fontSize: "15px", textAlign: "center", textDecoration: 'none', fontFamily: "Montserrat Alternates"}} to={"/registration"}>Создать аккаунт</Link>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    );
  }
);

export default EnterPage;
