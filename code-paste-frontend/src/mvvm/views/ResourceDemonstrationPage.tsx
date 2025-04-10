import { Box, useTheme } from "@mui/material";
import { observer } from "mobx-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ResourceDemonstrationViewModel } from "../view_models/ResourceDemonstrationViewModel";
import ResourcePasswordPanel from "../../ui/moleculas/ResourcePasswordPanel";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourceDemonstrationPanel from "../../ui/organisms/ResourceDemonstrationPanel";
import LoadingPanel from "../../ui/atoms/LoadingPanel";
import { useCallback, useEffect, useState } from "react";
import { FetchingStatus } from "../../helpers/ResourceFetchingStatus";
import SharePopup from "../../ui/moleculas/SharePopup";
import customSesionStorage from "../../helpers/SessionController";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import FolderDemonstration from "../../ui/moleculas/FolderDemonstration";

const ResourceDemonstrationPage = observer(
  ({ viewModel }: { viewModel: ResourceDemonstrationViewModel }) => {
    const stylingProps = {
      theme: useTheme(),
      styles: useStyles(useTheme()),
    };

    const navigate = useNavigate();
    const location = useLocation();

    const clearPage = useCallback(() => {
      viewModel.clearResource();
      window.removeEventListener("popstate", clearPage);
    }, [viewModel]);

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: false,
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

    useEffect(() => {
      if (viewModel.backRedirectOnDelete) {
        navigate(`/resource/${viewModel.backRedirectOnDelete}`);
      }
    }, [viewModel.backRedirectOnDelete]);

    useEffect(() => {
      if (viewModel.resourceAuthorRedirect) {
        navigate(`/account/${viewModel.resourceAuthorRedirect}`);
      }
    }, [viewModel.resourceAuthorRedirect]);

    if (
      viewModel.resourceModel.isPrivate === undefined ||
      (viewModel.getResource().resource.status === FetchingStatus.NotStarted &&
        viewModel.isPasswordEntered) ||
      (viewModel.getResource().resource.status === FetchingStatus.InProgress &&
        viewModel.folderResourcesList === undefined)
    ) {
      return <LoadingPanel stylingProps={stylingProps} />;
    }

    return (
      <Box className={stylingProps.styles.basicPanel}>
        {viewModel.inSharingMode ? (
          <SharePopup
            id='share_popup'
            stylingProps={stylingProps}
            resourceUuid={viewModel.resourceModel.resourceUuid!}
            goBack={viewModel.disableShareMode}
          />
        ) : viewModel.needToAskPassword() ? (
          <ResourcePasswordPanel onCheckButtonClick={viewModel.checkPassword} />
        ) : viewModel.resourceModel.type == "text" ? (
          <ResourceDemonstrationPanel
            stylingProps={stylingProps}
            resource={viewModel.getResource()}
            actions={viewModel.getActions()}
          />
        ) : (
          <FolderDemonstration
            onDeleteFolder={viewModel.onDeleteFolder}
            stylingProps={stylingProps}
            onFolderChipsClick={viewModel.onFolderChipsClick}
            resource={viewModel.resourceModel}
            onCreateFolder={viewModel.onCreateFolder}
            resourcesList={viewModel.folderResourcesList ?? []}
            resourcePreviewProps={resourcePreviewProps}
          />
        )}
      </Box>
    );
  }
);

export default ResourceDemonstrationPage;
