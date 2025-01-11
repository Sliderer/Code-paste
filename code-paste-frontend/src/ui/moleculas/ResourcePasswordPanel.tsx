import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import { useState } from "react";

const ResourcePasswordPanel = ({
  onCheckButtonClick
}: {
  onCheckButtonClick: (value: string) => void;
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const [password, setPassword] = useState('');

  return (
    <Box className={styles.centerPanel}>
      <Box className={styles.settingsPanel}>
        <Stack spacing={4}>
          <Typography>Этот файл защищен паролем</Typography>
          <SettingsTextInput placeholder="Пароль" type="password" onChange={e => setPassword(e)}/>
          <Button
            className={styles.publishButton}
            sx={{
              background: theme.palette.primary.main,
              color: theme.palette.primary.dark,
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
