import { Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";

const OtherUserAccount = ({nickname, subscribeOnPublications} : {nickname: string, subscribeOnPublications: (publisher: string) => void}) => {
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
        <Button
          className={styles.publishButton}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.dark,
            borderRadius: 2,
          }}
          onClick={() => subscribeOnPublications(nickname)}
        >
          Подписаться на публикации
        </Button>
      </Stack>
    </>
  );
};

export default OtherUserAccount;
