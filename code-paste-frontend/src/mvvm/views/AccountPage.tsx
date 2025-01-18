import { observer } from "mobx-react";
import { AccountViewModel } from "../view_models/AccountViewModel";
import { getCurrentNickname } from "../../helpers/SessionController";
import { useLocation } from "react-router-dom";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";

const AccountPage = observer(
  ({ viewModel }: { viewModel: AccountViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const currentNickname = getCurrentNickname();
    const location = useLocation();
    const nickname = location.pathname.split("/").reverse()[0];

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: false
    }

    return (
      <Box className={styles.basicPanel} sx={{}}>
        <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
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
            <Button
              className={styles.publishButton}
              sx={{
                background: theme.palette.primary.main,
                color: theme.palette.primary.dark,
                borderRadius: 2,
              }}
            >
              Подписаться на публикации
            </Button>
          </Stack>
          <ResourcePreviewPanel resources={viewModel.getUsersResources()} resourcePreviewProps={resourcePreviewProps}/>
        </Stack>
      </Box>
    );
  }
);

export default AccountPage;
