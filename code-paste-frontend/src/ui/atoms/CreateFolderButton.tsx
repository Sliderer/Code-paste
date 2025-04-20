import { Button, IconButton } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";
import { Folder } from "@mui/icons-material";

const CreateFolderButton = ({
  stylingProps,
  onClick,
}: {
  stylingProps: StylingProps;
  onClick: () => void;
}) => {
  return (
    <IconButton
      id='create_folder_button'
      onClick={onClick}
      className={stylingProps.styles.lightShadow}
      sx={{
        backgroundColor: stylingProps.theme.palette.primary.main,
        color: stylingProps.theme.palette.primary.dark,
        borderRadius: 3,
      }}
    >
      +<Folder />
    </IconButton>
  );
};

export default CreateFolderButton;
