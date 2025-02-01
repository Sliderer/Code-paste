import { Box, Stack } from "@mui/material";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import ResourcePreview, { ResourcePreviewProps } from "../atoms/ResourcePreview";

const ResourcePreviewPanel = ({resources, resourcePreviewProps} : {resources: ResourcePreviewModel[], resourcePreviewProps: ResourcePreviewProps}) => {
    console.log('redner')
    return <Stack spacing={3}>
        {
            resources.map((resource, index) =>
                <ResourcePreview key={index} resource={resource} props={resourcePreviewProps}/>
            )
        }
    </Stack>
}

export default ResourcePreviewPanel;