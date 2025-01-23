import { Box, Button, useTheme } from "@mui/material";
import { useStyles } from "../../styling/styles/ElementStyles";

const CreateResourceButton = ({onClick} : {onClick: () => void}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  return (
    <Button
      className={styles.lightShadow}
      onClick={onClick}
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        borderRadius: 3,
        minWidth: "200px"
      }}
    >
      Создать
    </Button>
  );
};

export default CreateResourceButton;
