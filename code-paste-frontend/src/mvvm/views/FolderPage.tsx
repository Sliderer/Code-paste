import { observer } from "mobx-react";
import { Box, Stack, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import { FolderViewModel } from "../view_models/FolderViewModel";

const FolderPage = observer(({ viewModel }: { viewModel: FolderViewModel }) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

  const resourcePreviewProps: ResourcePreviewProps = {
    showAuthor: true,
  };

  return (
    <Box className={stylingProps.styles.basicPanel}>
      <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
        <ResourcePreviewPanel
          id='resources_list'
          stylingProps={stylingProps}
          resources={viewModel.getUsersResources()}
          resourcePreviewProps={resourcePreviewProps}
        />
      </Stack>
    </Box>
  );
});

export default FolderPage;
