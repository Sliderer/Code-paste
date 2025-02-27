import { Button} from "@mui/material";
import StylingProps from "../../../helpers/StylingProps";

const CreateResourceButton = ({stylingProps, onClick} : {stylingProps: StylingProps, onClick: () => void}) => {

  return (
    <Button
      className={stylingProps.styles.lightShadow}
      onClick={onClick}
      sx={{
        backgroundColor: stylingProps.theme.palette.primary.main,
        color: stylingProps.theme.palette.primary.dark,
        borderRadius: 3,
        minWidth: "200px"
      }}
    >
      Создать
    </Button>
  );
};

export default CreateResourceButton;
