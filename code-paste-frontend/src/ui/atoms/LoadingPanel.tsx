import { Box, CircularProgress } from "@mui/material";
import StylingProps from "../../helpers/StylingProps";

const LoadingPanel = ({
  stylingProps,
  progress,
}: {
  stylingProps: StylingProps;
  progress?: number;
}) => {
  return (
    <Box id={'loading_panel'} className={stylingProps.styles.centerPanel}>
      <CircularProgress value={10} size={150} thickness={1} />
    </Box>
  );
};

export default LoadingPanel;
