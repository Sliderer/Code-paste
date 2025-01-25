import { Box, Stack, Typography, useTheme } from "@mui/material";
import {
  FetchingStatus,
  ResourceFetchingStatus,
} from "../../helpers/ResourceFetchingStatus";
import LoadingPanel from "../atoms/LoadingPanel";
import { useStyles } from "../styling/styles/ElementStyles";
import { ResourceAction } from "../../helpers/ResourceAction";
import ResourceActionButton from "../atoms/ResourceActionButton";

const ResourceDemonstrationPanel = ({
  resource,
  actions,
}: {
  resource: ResourceFetchingStatus;
  actions: ResourceAction[];
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Stack spacing={5}>
      <Stack direction={"row"} spacing={4} justifyContent={"center"}>
        {actions.map((action) => (
          <ResourceActionButton action={action} />
        ))}
      </Stack>
      <Box
        className={styles.basicShadow}
        sx={{
          padding: 1,
          borderRadius: 1,
          height: "70vh",
          width: "90vw",
        }}
      >
        <Typography sx={{ color: "black" }}>{resource.text}</Typography>
      </Box>
    </Stack>
  </Box>
  );
};

export default ResourceDemonstrationPanel;
