import { Button, useTheme } from "@mui/material";
import { useStyles } from '../styling/styles/ElementStyles';

const CreateResourceButton = () => {
    const theme = useTheme();
    const classes = useStyles(theme);
    
    return <Button className={classes.createResourceButton}>
        Create resource
    </Button>
}

export default CreateResourceButton;