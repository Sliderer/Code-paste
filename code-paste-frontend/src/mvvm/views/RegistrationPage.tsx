import { observer } from "mobx-react";
import { RegistrationViewModel } from "../view_models/RegistratioinViewModel";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegistrationPage = observer(
  ({ viewModel }: { viewModel: RegistrationViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigation = useNavigate();

    useEffect(() => {
      if (viewModel.userName !== undefined) {
        navigation(`/account/${viewModel.userName}`);
      }
    }, [viewModel.userName]);

    return (
      <div
        style={{
          backgroundImage: `url(${
            process.env.PUBLIC_URL + "/BackgroundSVG.svg"
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundClip: "0px",
          minHeight: "100vh",
        }}
      >
        <Box className={styles.centerPanel}>
          <Stack>
            <Typography
              className={styles.headerStyle}
              sx={{ fontSize: 30, textAlign: "center" }}
            >
              Регистрация
            </Typography>
            <Box className={styles.settingsPanel} sx={{ background: "white" }}>
              <Stack spacing={4}>
                <SettingsTextInput placeholder="Имя" onChange={setUserName} />
                <SettingsTextInput placeholder="E-mail" onChange={setEmail} />
                <SettingsTextInput
                  placeholder="Пароль"
                  type="password"
                  onChange={setPassword}
                />
                <Button
                  className={styles.publishButton}
                  sx={{
                    background: theme.palette.primary.main,
                    color: theme.palette.primary.dark,
                    borderRadius: 2,
                  }}
                  onClick={() =>
                    viewModel.createUser(userName, email, password)
                  }
                >
                  Зарегистрироваться
                </Button>
                <Link
                  style={{
                    color: theme.palette.primary.light,
                    fontSize: "15px",
                    textDecoration: "none",
                    textAlign: "center",
                    fontFamily: "Montserrat Alternates",
                  }}
                  to={"/enter"}
                >
                  Войти
                </Link>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </div>
    );
  }
);

export default RegistrationPage;
