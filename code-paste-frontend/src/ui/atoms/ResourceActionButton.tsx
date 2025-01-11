import { Box, Button, Typography, useTheme } from "@mui/material";
import { ResourceAction } from "../../helpers/ResourceAction";
import { useStyles } from "../styling/styles/ElementStyles";

const ResourceActionButton = ({action} : {action: ResourceAction}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return <Button className={styles.basicShadow} sx={{borderRadius: 10, padding: 1, textTransform: "none"}}>
        <Typography>{action.title}</Typography>
    </Button>
}

export default ResourceActionButton;