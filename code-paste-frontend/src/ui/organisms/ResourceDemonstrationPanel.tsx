import { Box, Stack, Typography, useTheme } from "@mui/material";
import { ResourceFetchingStatus } from "../../helpers/ResourceFetchingStatus";
import { useStyles } from "../styling/styles/ElementStyles";
import { ResourceAction } from "../../helpers/ResourceAction";
import ResourceActionButton from "../atoms/ResourceActionButton";
import StylingProps from "../../helpers/StylingProps";

const ResourceDemonstrationPanel = ({
  stylingProps,
  resource,
  actions,
}: {
  stylingProps: StylingProps;
  resource: ResourceFetchingStatus;
  actions: ResourceAction[];
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={4} justifyContent={"center"}>
          {actions.map((action, index) => (
            <ResourceActionButton
              stylingProps={stylingProps}
              key={index}
              action={action}
            />
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
