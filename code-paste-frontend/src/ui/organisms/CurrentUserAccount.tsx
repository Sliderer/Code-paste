import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";

const CurrentUserAccount = ({nickname, email, telegram, logOut} : {nickname: string, email: string, telegram: string, logOut: () => void}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <>
      <Stack
        direction={"row"}
        spacing={10}
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ display: "flex" }}
      >
        <Typography
          className={styles.headerStyle}
          sx={{ fontSize: 50, fontWeight: "bold" }}
        >
          {nickname}
        </Typography>
        <Typography>E-mail</Typography>
        <Typography>Telegram</Typography>
        <Button className={styles.createResourcePanel} onClick={logOut}>Выйти</Button>
      </Stack>
    </>
  );
};

export default CurrentUserAccount;
