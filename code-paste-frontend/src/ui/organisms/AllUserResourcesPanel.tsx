import { Stack } from "@mui/material";
import { useState } from "react";
import ResourcesList from "./ResourcesList";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import { ResourcePreviewProps } from "../atoms/ResourcePreview";
import StylingProps from "../../helpers/StylingProps";
import SelectResourcesTypeButton from "../atoms/account_page/SelectResourcesTypeButton";

const AllUserResourcesPanel = ({
  stylingProps,
  allResourcesList,
  allResourcesPreviewProps,
  allResourcesOnLoad,
  likedResourcesList,
  likedResourcesPreviewProps,
  likedResourcesOnLoad,
}: {
  stylingProps: StylingProps;
  allResourcesList: ResourcePreviewModel[];
  allResourcesPreviewProps: ResourcePreviewProps;
  allResourcesOnLoad: () => void;
  likedResourcesList: ResourcePreviewModel[];
  likedResourcesPreviewProps: ResourcePreviewProps;
  likedResourcesOnLoad: () => void;
}) => {
  const [showAllResources, setShowAllResources] = useState(true);

  const resourceList = showAllResources ? allResourcesList : likedResourcesList;
  const resourcePreviewProps = showAllResources
    ? allResourcesPreviewProps
    : likedResourcesPreviewProps;
  const onLoad = showAllResources ? allResourcesOnLoad : likedResourcesOnLoad;

  return (
    <Stack>
      <Stack
        direction={"row"}
        className={stylingProps.styles.basicPanel}
        spacing={2}
      >
        <SelectResourcesTypeButton
          buttonText={"Мои ресурсы"}
          isActive={showAllResources}
          onClick={() => {
            setShowAllResources(true);
          }}
          stylingProps={stylingProps}
        />

        <SelectResourcesTypeButton
          buttonText={"Избранное"}
          isActive={!showAllResources}
          onClick={() => {
            setShowAllResources(false);
          }}
          stylingProps={stylingProps}
        />
      </Stack>
      <ResourcesList
        stylingProps={stylingProps}
        resourcesList={resourceList}
        resourcePreviewProps={resourcePreviewProps}
        onLoad={onLoad}
      />
    </Stack>
  );
};

export default AllUserResourcesPanel;
