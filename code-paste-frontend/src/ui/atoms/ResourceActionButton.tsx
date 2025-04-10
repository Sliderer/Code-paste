import { Button, Typography } from "@mui/material";
import { ResourceAction } from "../../helpers/ResourceAction";
import { useState } from "react";
import StylingProps from "../../helpers/StylingProps";

const ResourceActionButton = ({
  id,
  stylingProps,
  action,
}: {
  id?: string
  stylingProps: StylingProps;
  action: ResourceAction;
}) => {
  const [isActive, setIsActive] = useState(action.isActive);

  const onClick = () => {
    action.action();
    setIsActive(!isActive);
  };

  const background = isActive
    ? stylingProps.theme.palette.primary.light
    : stylingProps.theme.palette.primary.contrastText;

  return (
    <Button
      className={stylingProps.styles.basicShadow}
      onClick={onClick}
      sx={{
        borderRadius: 10,
        padding: 1,
        textTransform: "none",
        background: background,
      }}
    >
      <Typography>{action.title}</Typography>
    </Button>
  );
};

export default ResourceActionButton;
