import { Button, Stack, Typography, useTheme } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";

const OtherUserAccount = ({
  stylingProps,
  nickname,
  subscribeOnPublications,
}: {
  stylingProps: StylingProps;
  nickname: string;
  subscribeOnPublications: (publisher: string) => void;
}) => {
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
          className={stylingProps.styles.headerStyle}
          sx={{ fontSize: 50, fontWeight: "bold" }}
        >
          {nickname}
        </Typography>
        <Button
          className={stylingProps.styles.publishButton}
          sx={{
            background: stylingProps.theme.palette.primary.main,
            color: stylingProps.theme.palette.primary.dark,
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
