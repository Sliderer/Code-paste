import { Box, Container, Stack, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useParams, RoutesProps, useLocation } from "react-router-dom";
import { ResourceDemonstrationViewModel } from "../view_models/ResourceDemonstrationViewModel";
import ResourcePasswordPanel from "../../ui/moleculas/ResourcePasswordPanel";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourceDemonstrationPanel from "../../ui/organisms/ResourceDemonstrationPanel";
import { ResourceAction } from "../../helpers/ResourceAction";
import LoadingPanel from "../../ui/atoms/LoadingPanel";
import { useEffect, useState } from "react";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import { createPortal } from "react-dom";
import Popup from "reactjs-popup";
import SharePopup from "../../ui/moleculas/SharePopup";

const ResourceDemonstrationPage = observer(
  ({ viewModel }: { viewModel: ResourceDemonstrationViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
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

    if (
      viewModel.resourceModel.isPrivate === undefined ||
      (viewModel.getResource().status === FetchingStatus.NotStarted &&
        viewModel.isPasswordEntered) ||
      viewModel.getResource().status === FetchingStatus.InProgress
    ) {
      return <LoadingPanel />;
    }

    return (
      <Box className={styles.basicPanel}>
        {viewModel.inSharingMode ? (
          <SharePopup
            resourceUuid={viewModel.resourceModel.resourceUuid!}
            goBack={viewModel.disableShareMode}
          />
        ) : viewModel.needToAskPassword() ? (
          <ResourcePasswordPanel onCheckButtonClick={viewModel.checkPassword} />
        ) : (
          <ResourceDemonstrationPanel
            resource={viewModel.getResource()}
            actions={viewModel.getActions()}
          />
        )}
      </Box>
    );
  }
);

export default ResourceDemonstrationPage;
