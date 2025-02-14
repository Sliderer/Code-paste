import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import ChangableText from "../atoms/ChangableText";
import ValidationResult from "../../helpers/ValidationResult";

const CurrentUserAccount = ({
  nickname,
  email,
  telegram,
  logOut,
  updateContact,
  validateContact,
}: {
  nickname: string;
  email: string;
  telegram: string;
  logOut: () => void;
  updateContact: (value: string, field: string) => void;
  validateContact: (value: string, field: string) => ValidationResult;
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
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
        <Stack>
          <Stack direction={"row"} spacing={10}>
            <Typography
              className={styles.headerStyle}
              sx={{ textAlign: "top", fontSize: 50, fontWeight: "bold" }}
            >
              {nickname}
            </Typography>

            <Button className={styles.createResourcePanel} onClick={logOut}>
              Выйти
            </Button>
          </Stack>

          <ChangableText
            defaultText={email}
            validate={(value: string) => validateContact(value, "email")}
            onChange={(value: string) => updateContact(value, "email")}
          />
          <ChangableText
            defaultText={telegram}
            validate={(value: string) => validateContact(value, "telegram")}
            onChange={(value: string) => updateContact(value, "telegram")}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default CurrentUserAccount;
