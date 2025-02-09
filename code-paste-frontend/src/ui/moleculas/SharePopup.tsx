import { Stack, Box, useTheme, Typography, Button } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import QRCode from "react-qr-code";
import { useCallback, useState } from "react";

const SharePopup = ({ resourceUuid, goBack }: { resourceUuid: string, goBack: () => void}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const [link, _] = useState(`http://localhost:3000/resource/${resourceUuid}`);

  const copyLink = useCallback(() => {
    navigator.clipboard.writeText(link);
  }, []);

  return (
    <Box>
      <Stack className={styles.panelWithShadow} sx={{padding: "50px"}} direction={"column"} spacing={5}>
        <Button className={styles.basicButton} onClick={goBack}>Назад</Button>
        <QRCode value={link} />
        <Button onClick={copyLink}>Скопировать ссылку</Button>
      </Stack>
    </Box>
  );
};

export default SharePopup;
