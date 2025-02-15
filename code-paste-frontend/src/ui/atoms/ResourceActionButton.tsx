import { Box, Button, Typography, useTheme } from "@mui/material";
import { ResourceAction } from "../../helpers/ResourceAction";
import { useStyles } from "../styling/styles/ElementStyles";
import { useState } from "react";

const ResourceActionButton = ({action} : {action: ResourceAction}) => {
    const theme = useTheme();
    const styles = useStyles(theme);

    const [isActive, setIsActive] = useState(action.isActive)
    console.log(action, action.isActive)

    const onClick = () => {
        action.action();
        setIsActive(!isActive);
    }

    const background = isActive ? theme.palette.primary.light : theme.palette.primary.contrastText

    return <Button className={styles.basicShadow} onClick={onClick} sx={{borderRadius: 10, padding: 1, textTransform: "none", background: background}}>
        <Typography>{action.title}</Typography>
    </Button>
}

export default ResourceActionButton;