import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import ChangableText from "../atoms/ChangableText";

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
        <ChangableText defaultText="email" validate={(value: string) => { return true;}} onChange={(value: string) => {}}/>
        <ChangableText defaultText="telegram" validate={(value: string) => { return true;}} onChange={(value: string) => {}}/>
        <Button className={styles.createResourcePanel} onClick={logOut}>Выйти</Button>
      </Stack>
    </>
  );
};

export default CurrentUserAccount;
