import { Stack, Box, Button } from "@mui/material";
import QRCode from "react-qr-code";
import { useCallback, useState } from "react";
import StylingProps from "../../helpers/StylingProps";

const SharePopup = ({
  stylingProps,
  resourceUuid,
  goBack,
}: {
  stylingProps: StylingProps;
  resourceUuid: string;
  goBack: () => void;
}) => {
  const [link, _] = useState(`http://localhost:3000/resource/${resourceUuid}`);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(link);
  }, []);

  return (
    <Box>
      <Stack
        className={stylingProps.styles.panelWithShadow}
        sx={{ padding: "50px" }}
        direction={"column"}
        spacing={5}
      >
        <Button className={stylingProps.styles.basicButton} onClick={goBack}>
          Назад
        </Button>
        <QRCode value={link} />
        <Button onClick={copyLink}>Скопировать ссылку</Button>
      </Stack>
    </Box>
  );
};

export default SharePopup;
