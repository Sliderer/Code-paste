import { Box, Stack, Typography } from "@mui/material";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import { Link } from "react-router-dom";
import StylingProps from "../../helpers/StylingProps";

export type ResourcePreviewProps = {
  showAuthor: boolean;
};

const ResourcePreview = ({
  stylingProps,
  resource,
  props,
}: {
  stylingProps: StylingProps,
  resource: ResourcePreviewModel;
  props: ResourcePreviewProps;
}) => {
  return (
    <Link
      style={{
        color: stylingProps.theme.palette.primary.dark,
        textDecoration: "none",
        fontFamily: "Montserrat Alternates",
      }}
      to={`/resource/${resource.resourceUuid}`}
    >
      <Box className={stylingProps.styles.basicShadow} sx={{ borderRadius: 2, padding: 1 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          alignContent={"center"}
          spacing={2}
        >
          <Typography
            style={{
              fontSize: "30px",
            }}
          >
            {resource.name}
          </Typography>
          {props.showAuthor && (
            <Typography
              style={{
                fontSize: "15px",
              }}
            >
              {resource.author}
            </Typography>
          )}
        </Stack>
        <Typography>{resource.previewText}</Typography>
      </Box>
    </Link>
  );
};

export default ResourcePreview;
