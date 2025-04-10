import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import ResourcePreviewPanel from "../moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../atoms/ResourcePreview";
import { Button, Stack } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";
import LoadingPanel from "../atoms/LoadingPanel";

const ResourcesList = ({
  id,
  stylingProps,
  resourcesList,
  resourcePreviewProps,
  onLoad,
}: {
  id?: string;
  stylingProps: StylingProps;
  resourcesList: ResourcePreviewModel[] | undefined;
  resourcePreviewProps: ResourcePreviewProps;
  onLoad: () => void;
}) => {
  return (
    <Stack id={id} spacing={2}>
      {resourcesList === undefined ? (
        <LoadingPanel stylingProps={stylingProps} />
      ) : (
        <>
          <ResourcePreviewPanel
            id='folder_resource_panel'
            stylingProps={stylingProps}
            resources={resourcesList ?? []}
            resourcePreviewProps={resourcePreviewProps}
          />
          <Button onClick={onLoad}>Еще</Button>
        </>
      )}
    </Stack>
  );
};

export default ResourcesList;
