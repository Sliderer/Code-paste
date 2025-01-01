import { Stack, useTheme } from "@mui/material";
import ResourceInputField from "../../ui/atoms/ResourceInputField";
import ResourceCreationSettings from "../../ui/moleculas/ResourceCreationSettings";
import { useStyles } from "../../ui/styling/styles/ElementStyles";

const ResourceCreationPage = () => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return (
      <Stack direction={"row"} className={styles.basicPanel}>
        <ResourceInputField />
        <ResourceCreationSettings />
      </Stack>
    );
}

export default ResourceCreationPage;