import { observer } from "mobx-react";
import { AccountViewModel } from "../view_models/AccountViewModel";
import { useLocation } from "react-router-dom";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import CurrentUserAccount from "../../ui/organisms/CurrentUserAccount";
import OtherUserAccount from "../../ui/organisms/OtherUserAccount";
import { useCallback, useEffect, useState } from "react";
import customSesionStorage from "../../helpers/SessionController";

const AccountPage = observer(
  ({ viewModel }: { viewModel: AccountViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const currentNickname = customSesionStorage.getUserName().getValue();
    const location = useLocation();
    const nickname = location.pathname.split("/").reverse()[0];
    const [reloadTrigger, setReloadTrigger] = useState(0);

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: false,
    };

    useEffect(() => {
      if (viewModel.resourcesList.length === 0) {
        viewModel.getUsersResources();
      }
    }, []);

    const logout = () => {
      viewModel.logOut();
      window.location.reload();
    }

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
              logOut={viewModel.logOut}
            />
          )}

          <ResourcePreviewPanel
            resources={viewModel.resourcesList}
            resourcePreviewProps={resourcePreviewProps}
          />
          <Button onClick={logout}>Еще</Button>
        </Stack>
      </Box>
    );
  }
);

export default AccountPage;
