import { observer } from "mobx-react";
import { AccountViewModel } from "../view_models/AccountViewModel";
import { getCurrentNickname } from "../../helpers/SessionController";
import { useLocation } from "react-router-dom";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import CurrentUserAccount from "../../ui/organisms/CurrentUserAccount";
import OtherUserAccount from "../../ui/organisms/OtherUserAccount";
import { useEffect } from "react";

const AccountPage = observer(
  ({ viewModel }: { viewModel: AccountViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const currentNickname = getCurrentNickname();
    const location = useLocation();
    const nickname = location.pathname.split("/").reverse()[0];

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: false,
    };

    useEffect(() => {
      if (viewModel.account.resourcesList.length === 0) {
        viewModel.getUsersResources();
      }
    }, []);

    return (
      <Box className={styles.basicPanel} sx={{}}>
        <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
          {currentNickname !== nickname ? (
            <OtherUserAccount nickname={nickname} />
          ) : (
            <CurrentUserAccount
              nickname={nickname}
              email={"email"}
              telegram="telegram"
            />
          )}

          <ResourcePreviewPanel
            resources={viewModel.account.resourcesList}
            resourcePreviewProps={resourcePreviewProps}
          />
        </Stack>
      </Box>
    );
  }
);

export default AccountPage;
