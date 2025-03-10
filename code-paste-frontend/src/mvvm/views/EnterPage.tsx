import { observer } from "mobx-react";
import { EnterViewModel } from "../view_models/EnterViewModel";
import { useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { Box, Button, Stack, Typography } from "@mui/material";
import SettingsTextInput from "../../ui/atoms/resource_creation_settings/SettingsTextInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EnterPage = observer(({ viewModel }: { viewModel: EnterViewModel }) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigation = useNavigate();

  useEffect(() => {
    if (viewModel.userName != undefined) {
      navigation(`/account/${viewModel.userName}`);
    }
  }, [viewModel.userName]);

  const enter = () => {
    const validationResult = viewModel.validateData(userName, password);
    if (validationResult.isValid) {
      viewModel.checkPassword(userName, password);
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
        height: "100vh",
      }}
    >
      <Box className={stylingProps.styles.centerPanel}>
        <Stack>
          <Typography
            className={stylingProps.styles.headerStyle}
            sx={{ fontSize: 30, textAlign: "center" }}
          >
            Вход
          </Typography>
          <Box
            className={stylingProps.styles.settingsPanel}
            sx={{ background: "white" }}
          >
            <Stack spacing={4} sx={{ width: "40vh" }}>
              <SettingsTextInput
                stylingProps={stylingProps}
                placeholder="E-mail"
                onChange={setUserName}
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
                onClick={enter}
              >
                Войти
              </Button>
              <Link
                style={{
                  color: stylingProps.theme.palette.primary.light,
                  fontSize: "15px",
                  textAlign: "center",
                  textDecoration: "none",
                  fontFamily: "Montserrat Alternates",
                }}
                to={"/registration"}
              >
                Создать аккаунт
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </div>
  );
});

export default EnterPage;
