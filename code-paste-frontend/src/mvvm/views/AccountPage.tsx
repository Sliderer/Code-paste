import { observer } from "mobx-react";
import { AccountViewModel } from "../view_models/AccountViewModel";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Stack, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import CurrentUserAccount from "../../ui/organisms/CurrentUserAccount";
import OtherUserAccount from "../../ui/organisms/OtherUserAccount";
import { useEffect } from "react";
import customSesionStorage from "../../helpers/SessionController";
import ResourcesList from "../../ui/organisms/ResourcesList";
import AllUserResourcesPanel from "../../ui/organisms/AllUserResourcesPanel";

const AccountPage = observer(
  ({ viewModel }: { viewModel: AccountViewModel }) => {
    const stylingProps = {
      theme: useTheme(),
      styles: useStyles(useTheme()),
    };

    const currentNickname = customSesionStorage.getUserName().getValue();
    const location = useLocation();
    const nickname = location.pathname.split("/").reverse()[0];
    let navigation = useNavigate();

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: false,
    };

    const likedResourcePreviewProps: ResourcePreviewProps = {
      showAuthor: true,
    };

    useEffect(() => {
      if (viewModel.account === undefined) {
        viewModel.getUserMetaData(nickname);
      }
    }, []);

    const logout = () => {
      viewModel.logOut();
      window.location.reload();
    };

    useEffect(() => {
      if (viewModel.redirectToEnder) {
        viewModel.redirectToEnder = false;
        navigation(`/enter`);
      }
    }, [viewModel.redirectToEnder]);

    if (viewModel.account === undefined) {
      return <></>;
    }

    return (
      <Box className={stylingProps.styles.basicPanel} sx={{}}>
        <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
          {currentNickname !== nickname ? (
            <Stack>
              <OtherUserAccount
                stylingProps={stylingProps}
                nickname={nickname}
                subscribeOnPublications={viewModel.subscribeOnPublications}
              />
              <ResourcesList
                stylingProps={stylingProps}
                resourcesList={viewModel.resourcesList}
                resourcePreviewProps={resourcePreviewProps}
                onLoad={viewModel.getUsersResources}
              />
            </Stack>
          ) : (
            <Stack>
              <CurrentUserAccount
                stylingProps={stylingProps}
                nickname={nickname}
                email={viewModel.account!.email}
                telegram={viewModel.account!.telegram}
                logOut={logout}
                validateContact={viewModel.validateContact}
                updateContact={viewModel.updateContact}
              />
              <AllUserResourcesPanel
                stylingProps={stylingProps}
                allResourcesList={viewModel.resourcesList}
                allResourcesPreviewProps={resourcePreviewProps}
                allResourcesOnLoad={viewModel.getUsersResources}
                likedResourcesList={viewModel.likedResourcesList}
                likedResourcesPreviewProps={likedResourcePreviewProps}
                likedResourcesOnLoad={viewModel.getLikedUsersResources}
              />
            </Stack>
          )}
        </Stack>
      </Box>
    );
  }
);

export default AccountPage;
