import { AxiosResponse } from "axios";
import StylingProps from "../../helpers/StylingProps";
import FolderChips from "../atoms/FolderChips";
import { Stack } from "@mui/material";

const ResourceNavigationPanel = ({
  stylingProps,
  resourcePath,
  onFolderChipsClick,
}: {
  stylingProps: StylingProps;
  resourcePath: string;
  onFolderChipsClick: (value: string) => Promise<AxiosResponse<string>>;
}) => {
  return (
    <Stack direction={"row"} spacing={2} alignContent={"center"} alignItems={"center"}>
      {resourcePath.split("/").map((folderName, index) => {
        const fullPath = resourcePath
          .split("/")
          .slice(0, index + 1)
          .join("/");

        return (
          <FolderChips
            key={index}
            getResourceUuid={onFolderChipsClick}
            fullPath={fullPath}
            stylingProps={stylingProps}
            name={folderName}
          />
        );
      })}
    </Stack>
  );
};

export default ResourceNavigationPanel;
