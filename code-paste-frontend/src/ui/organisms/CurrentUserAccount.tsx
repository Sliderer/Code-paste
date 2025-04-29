import { Button, Stack, Typography } from "@mui/material";
import ChangableText from "../atoms/ChangableText";
import ValidationResult from "../../helpers/ValidationResult";
import StylingProps from "../../helpers/StylingProps";

const CurrentUserAccount = ({
  stylingProps,
  nickname,
  email,
  telegram,
  logOut,
  updateContact,
  validateContact,
}: {
  stylingProps: StylingProps;
  nickname: string;
  email: string;
  telegram: string;
  logOut: () => void;
  updateContact: (value: string, field: string) => void;
  validateContact: (value: string, field: string) => ValidationResult;
}) => {
  return (
    <>
      <Stack
        direction={"row"}
        spacing={10}
        justifyContent={"center"}
        alignItems={"top"}
        alignContent={"top"}
        textAlign={"left"}
        sx={{ display: "flex" }}
      >
        <Stack spacing={3}>
          <Stack direction={"row"} spacing={5}>
            <Typography
              id='nickname_text'
              className={stylingProps.styles.headerStyle}
              sx={{ textAlign: "top", fontSize: 50, fontWeight: "bold" }}
            >
              {nickname}
            </Typography>

            <Button
              id='logout_button'
              className={stylingProps.styles.createResourcePanel}
              onClick={logOut}
              sx={{ textAlign: "center", fontSize: 20 }}
            >
              Выйти
            </Button>
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} spacing={5}>
            <ChangableText
              id='email_text'
              stylingProps={stylingProps}
              defaultText={email}
              validate={(value: string) => validateContact(value, "email")}
              onChange={(value: string) => updateContact(value, "email")}
            />
            <ChangableText
              id='telegram_text'
              stylingProps={stylingProps}
              defaultText={telegram}
              validate={(value: string) => validateContact(value, "telegram")}
              onChange={(value: string) => updateContact(value, "telegram")}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default CurrentUserAccount;
