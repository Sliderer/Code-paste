import { Stack } from "@mui/material";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import ResourcePreview, {
  ResourcePreviewProps,
} from "../atoms/ResourcePreview";
import StylingProps from "../../helpers/StylingProps";

const ResourcePreviewPanel = ({
  id,
  stylingProps,
  resources,
  resourcePreviewProps,
}: {
  id?: string;
  stylingProps: StylingProps;
  resources: ResourcePreviewModel[];
  resourcePreviewProps: ResourcePreviewProps;
}) => {
  return (
    <Stack id={id} spacing={3}>
      {resources.map((resource, index) => (
        <ResourcePreview
          stylingProps={stylingProps}
          key={index}
          resource={resource}
          props={resourcePreviewProps}
        />
      ))}
    </Stack>
  );
};

export default ResourcePreviewPanel;
