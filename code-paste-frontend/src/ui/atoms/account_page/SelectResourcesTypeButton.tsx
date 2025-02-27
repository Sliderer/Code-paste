import { Button } from "@mui/material";
import StylingProps from "../../../helpers/StylingProps";

const SelectResourcesTypeButton = ({
  buttonText,
  isActive,
  onClick,
  stylingProps,
}: {
  buttonText: string;
  isActive: boolean;
  onClick: () => void;
  stylingProps: StylingProps;
}) => {
  const color = isActive ? stylingProps.theme.palette.primary.dark : stylingProps.theme.palette.primary.light;
  const border = isActive ? "1px solid" : "none"; 

  return (
    <Button
      sx={{
        color: color,
        borderBottom: border,
        padding: "10px 20px 10px 20px"
      }}
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default SelectResourcesTypeButton;
