import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import ResourcePreviewPanel from "../moleculas/ResourcePreviewPanel";
import { ResourcePreviewProps } from "../atoms/ResourcePreview";
import { Button, Stack } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";

const ResourcesList = ({
  stylingProps,
  resourcesList,
  resourcePreviewProps,
  onLoad,
}: {
  stylingProps: StylingProps;
  resourcesList: ResourcePreviewModel[];
  resourcePreviewProps: ResourcePreviewProps;
  onLoad: () => void;
}) => {
  return (
    <Stack spacing={2}>
      <ResourcePreviewPanel
        stylingProps={stylingProps}
        resources={resourcesList}
        resourcePreviewProps={resourcePreviewProps}
      />
      <Button onClick={onLoad}>Еще</Button>
    </Stack>
  );
};

export default ResourcesList;
