import { Box, Button, Stack, Typography } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";
import ResourcesList from "../organisms/ResourcesList";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import { ResourcePreviewProps } from "../atoms/ResourcePreview";
import CreateFolderButton from "../atoms/CreateFolderButton";
import { useState } from "react";
import CreateFolderPanel from "./CreateFolderPanel";
import ResourceModel from "../../mvvm/models/ResourceModel";
import FolderChips from "../atoms/FolderChips";
import { AxiosResponse } from "axios";
import ResourceNavigationPanel from "./ResourceNavigationPanel";

const FolderDemonstration = ({
  stylingProps,
  resourcesList,
  resourcePreviewProps,
  resource,
  onCreateFolder,
  onDeleteFolder,
  onFolderChipsClick,
}: {
  stylingProps: StylingProps;
  resourcesList: ResourcePreviewModel[];
  resource: ResourceModel;
  resourcePreviewProps: ResourcePreviewProps;
  onCreateFolder: (value: string) => void;
  onDeleteFolder: () => void;
  onFolderChipsClick: (value: string) => Promise<AxiosResponse<string>>;
}) => {
  const [createFolder, setOnCreateFolder] = useState(false);

  if (createFolder) {
    return (
      <CreateFolderPanel
        onClose={() => {
          setOnCreateFolder(false);
        }}
        onCreate={(folderName: string) => {
          onCreateFolder(folderName);
          setOnCreateFolder(false);
        }}
        stylingProps={stylingProps}
      />
    );
  }

  const resourcePath =
    resource.owner + "/" + resource.path.split("/").slice(1).join("/");

  return (
    <Box sx={{ justifyContent: "center", width: "100%" }}>
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={5}>
          <ResourceNavigationPanel
            stylingProps={stylingProps}
            resourcePath={resourcePath}
            onFolderChipsClick={onFolderChipsClick}
          />
          <CreateFolderButton
            stylingProps={stylingProps}
            onClick={() => {
              setOnCreateFolder(true);
            }}
          />
          <Button
            className={stylingProps.styles.lightShadow}
            sx={{
              backgroundColor: stylingProps.theme.palette.primary.main,
              color: stylingProps.theme.palette.primary.dark,
              borderRadius: 3,
            }}
            onClick={onDeleteFolder}
          >
            Удалить папку
          </Button>
        </Stack>

        <ResourcesList
          stylingProps={stylingProps}
          resourcesList={resourcesList!}
          resourcePreviewProps={resourcePreviewProps}
          onLoad={() => {}}
        />
      </Stack>
    </Box>
  );
};

export default FolderDemonstration;
