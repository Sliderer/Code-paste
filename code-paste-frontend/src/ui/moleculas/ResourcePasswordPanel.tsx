import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import { useState } from "react";

const ResourcePasswordPanel = ({
  onCheckButtonClick,
}: {
  onCheckButtonClick: (value: string) => void;
}) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

  const [password, setPassword] = useState("");

  return (
    <Box className={stylingProps.styles.centerPanel}>
      <Box className={stylingProps.styles.settingsPanel}>
        <Stack spacing={4}>
          <Typography>Этот файл защищен паролем</Typography>
          <SettingsTextInput
            stylingProps={stylingProps}
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPassword(e)}
          />
          <Button
            className={stylingProps.styles.publishButton}
            sx={{
              background: stylingProps.theme.palette.primary.main,
              color: stylingProps.theme.palette.primary.dark,
              borderRadius: 2,
            }}
            onClick={() => onCheckButtonClick(password)}
          >
            Проверить пароль
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default ResourcePasswordPanel;
