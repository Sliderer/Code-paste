import { observer } from "mobx-react";
import { useLocation } from "react-router-dom";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import ResourcePreviewPanel from "../../ui/moleculas/ResourcePreviewPanel";
import { SearchViewModel } from "../view_models/SearchViewModel";
import { ResourcePreviewProps } from "../../ui/atoms/ResourcePreview";
import { useEffect } from "react";

const SearchPage = observer(({ viewModel }: { viewModel: SearchViewModel }) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };
  const location = useLocation();
  const searchText = location.pathname.split("/").reverse()[0];

  useEffect(() => {
    viewModel.search(searchText);
  }, [searchText]);

  const resourcePreviewProps: ResourcePreviewProps = {
    showAuthor: true,
  };

  return (
    <Box className={stylingProps.styles.basicPanel} sx={{}}>
      <Stack spacing={10} sx={{ justifyContent: "center", width: "100%" }}>
        {viewModel.resources.length === 0 ? (
          <Typography sx={{ fontSize: 40, textAlign: "center" }}>
            Ничего не нашлось
          </Typography>
        ) : (
          <ResourcePreviewPanel
            stylingProps={stylingProps}
            resources={viewModel.resources}
            resourcePreviewProps={resourcePreviewProps}
          />
        )}
      </Stack>
    </Box>
  );
});

export default SearchPage;
