import { Box, Stack, Typography } from "@mui/material";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import { Link } from "react-router-dom";
import StylingProps from "../../helpers/StylingProps";
import { Folder } from "@mui/icons-material";

export type ResourcePreviewProps = {
  showAuthor: boolean;
};

const ResourcePreview = ({
  stylingProps,
  resource,
  props,
}: {
  stylingProps: StylingProps;
  resource: ResourcePreviewModel;
  props: ResourcePreviewProps;
}) => {
  return (
    <Link
      reloadDocument
      style={{
        color: stylingProps.theme.palette.primary.dark,
        textDecoration: "none",
        fontFamily: "Montserrat Alternates",
      }}
      to={`/resource/${resource.resourceUuid}`}
    >
      <Box
        className={stylingProps.styles.basicShadow}
        sx={{ borderRadius: 2, padding: 2, paddingLeft: 5 }}
      >
        <Stack spacing={2}>
          <Stack
            direction={"column"}
            alignItems={"left"}
            alignContent={"left"}
            spacing={0}
          >
            {resource.type === "folder" && <Folder />}
            <Typography
              style={{
                fontSize: "40px",
                fontWeight: "bold",
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
                Автор: {resource.author}
              </Typography>
            )}
          </Stack>
          <hr style={{ color: "white" }} />
          <Typography style={{ fontSize: "35px" }}>
            {resource.previewText}
          </Typography>
        </Stack>
      </Box>
    </Link>
  );
};

export default ResourcePreview;
