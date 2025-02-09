import { Box, Stack, Typography, useTheme } from "@mui/material";
import ResourcePreviewModel from "../../mvvm/models/ResourcePreviewModel";
import { useStyles } from "../styling/styles/ElementStyles";
import { Link } from "react-router-dom";

export type ResourcePreviewProps = {
  showAuthor: boolean;
};

const ResourcePreview = ({
  resource,
  props,
}: {
  resource: ResourcePreviewModel;
  props: ResourcePreviewProps;
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Link
      style={{
        color: theme.palette.primary.dark,
        textDecoration: "none",
        fontFamily: "Montserrat Alternates",
      }}
      to={`/resource/${resource.resourceUuid}`}
    >
      <Box className={styles.basicShadow} sx={{ borderRadius: 2, padding: 1 }}>
        <Stack
          direction={"column"}
          alignItems={"left"}
          spacing={"0.1px"}
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
