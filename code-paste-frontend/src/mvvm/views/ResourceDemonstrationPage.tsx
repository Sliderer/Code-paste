import { Box, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResourceDemonstrationViewModel } from "../view_models/ResourceDemonstrationViewModel";
import ResourcePasswordPanel from "../../ui/moleculas/ResourcePasswordPanel";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourceDemonstrationPanel from "../../ui/organisms/ResourceDemonstrationPanel";
import LoadingPanel from "../../ui/atoms/LoadingPanel";
import { useEffect, useState } from "react";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import SharePopup from "../../ui/moleculas/SharePopup";
import customSesionStorage from "../../helpers/SessionController";

const ResourceDemonstrationPage = observer(
  ({ viewModel }: { viewModel: ResourceDemonstrationViewModel }) => {
    const stylingProps = {
      theme: useTheme(),
      styles: useStyles(useTheme()),
    };

    const navigate = useNavigate();
    const location = useLocation();

    const clearPage = () => {
      viewModel.clearResource();
      window.removeEventListener("popstate", clearPage);
    };

    useEffect(() => {
      const resourceUuid = location.pathname.split("/").reverse()[0];
      viewModel.setResourceUuid(resourceUuid);
      window.addEventListener("popstate", clearPage);
    }, []);

    useEffect(() => {
      if (viewModel.isDeleted) {
        navigate(`/account/${customSesionStorage.getUserName().getValue()}`);
      }
    }, [viewModel.isDeleted]);

    if (
      viewModel.resourceModel.isPrivate === undefined ||
      (viewModel.getResource().resource.status === FetchingStatus.NotStarted &&
        viewModel.isPasswordEntered) ||
      viewModel.getResource().resource.status === FetchingStatus.InProgress
    ) {
      return <LoadingPanel stylingProps={stylingProps} />;
    }

    return (
      <Box className={stylingProps.styles.basicPanel}>
        {viewModel.inSharingMode ? (
          <SharePopup
            stylingProps={stylingProps}
            resourceUuid={viewModel.resourceModel.resourceUuid!}
            goBack={viewModel.disableShareMode}
          />
        ) : viewModel.needToAskPassword() ? (
          <ResourcePasswordPanel onCheckButtonClick={viewModel.checkPassword} />
        ) : (
          <ResourceDemonstrationPanel
            stylingProps={stylingProps}
            resource={viewModel.getResource()}
            actions={viewModel.getActions()}
          />
        )}
      </Box>
    );
  }
);

export default ResourceDemonstrationPage;
