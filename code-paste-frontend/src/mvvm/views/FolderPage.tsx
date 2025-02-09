import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { Box, Stack, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import { FolderViewModel } from "../view_models/FolderViewModel";
import customSesionStorage from "../../helpers/SessionController";

const FolderPage = observer(
  ({ viewModel }: { viewModel: FolderViewModel }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const currentNickname = customSesionStorage.getUserName().getValue();
    const location = useLocation();
    const nickname = location.pathname.split("/").reverse()[0];

    const resourcePreviewProps: ResourcePreviewProps = {
      showAuthor: true
    }

    return (
      <Box className={styles.basicPanel} sx={{}}>
        <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
          <ResourcePreviewPanel resources={viewModel.getUsersResources()} resourcePreviewProps={resourcePreviewProps}/>
        </Stack>
      </Box>
    );
  }
);

export default FolderPage;
