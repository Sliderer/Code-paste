import { observer } from "mobx-react";
import { RegistrationViewModel } from "../view_models/RegistratioinViewModel";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegistrationPage = observer(
  ({ viewModel }: { viewModel: RegistrationViewModel }) => {
    const stylingProps = {
      theme: useTheme(),
      styles: useStyles(useTheme()),
    };

    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let navigation = useNavigate();

    useEffect(() => {
      if (viewModel.userName !== undefined) {
        navigation(`/account/${viewModel.userName}`);
      }
    }, [viewModel.userName]);

    const createUser = () => {
      const validationResult = viewModel.validateData(
        userName,
        email,
        password
      );
      if (validationResult.isValid) {
        viewModel.createUser(userName, email, password).then((isSuccessed) => {
          if (!isSuccessed) {
            setErrorMessage("Пользователь с таким уменем уже существует");
          }
        });
      } else {
        setErrorMessage(validationResult.error);
      }
    };

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
        <Box className={stylingProps.styles.centerPanel}>
          <Stack>
            <Typography
              className={stylingProps.styles.headerStyle}
              sx={{ fontSize: 30, textAlign: "center" }}
            >
              Регистрация
            </Typography>
            <Box
              className={stylingProps.styles.settingsPanel}
              sx={{ background: "white" }}
            >
              <Stack spacing={4} sx={{ width: "40vh" }}>
                <SettingsTextInput
                  stylingProps={stylingProps}
                  placeholder="Имя"
                  onChange={setUserName}
                />
                <SettingsTextInput
                  stylingProps={stylingProps}
                  placeholder="E-mail"
                  onChange={setEmail}
                />
                <SettingsTextInput
                  stylingProps={stylingProps}
                  placeholder="Пароль"
                  type="password"
                  onChange={setPassword}
                />
                <Typography sx={{ textAlign: "center" }}>
                  {errorMessage}
                </Typography>
                <Button
                  className={stylingProps.styles.publishButton}
                  sx={{
                    background: stylingProps.theme.palette.primary.main,
                    color: stylingProps.theme.palette.primary.dark,
                    borderRadius: 2,
                  }}
                  onClick={createUser}
                >
                  Зарегистрироваться
                </Button>
                <Link
                  style={{
                    color: stylingProps.theme.palette.primary.light,
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
