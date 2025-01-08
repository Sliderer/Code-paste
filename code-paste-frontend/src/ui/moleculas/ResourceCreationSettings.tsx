import React, { ChangeEvent, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Grid2,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import { languages } from "prismjs";
import SettingsTextInput from "../atoms/SettingsTextInput";
import SettingsSelectInput from "../atoms/SettingsSelectInput";

type ChangeHandler = (highlightSettings: any) => void;

const ResourceCreationSettings = ({ onTranslateLanguageChange, onProgrammingLanguageChange, onPublish }: { onTranslateLanguageChange: ChangeHandler, onProgrammingLanguageChange: ChangeHandler, onPublish: Function }) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const lifePeriods = [
    'Никогда не удалять', '1 час', '1 день', '1 неделя', '1 месяц'
  ]
  const syntaxHighlightingLanguages = ["Текст", "C++", "Python", "Java", "Json", "Protobuf"];
  const translateLanguages = ["Русский", "Английский", "Испанский", "Немецкий"];
  const [lifePeriod, setLifePeriod] = useState(lifePeriods[0]);

  return (
    <Box
      className={styles.settingsPanel}
    >
      <Stack display={"grid"} spacing={5}>
        <SettingsTextInput placeholder="Имя" />

        <SettingsTextInput placeholder="Пароль" type="password" />

        <SettingsTextInput placeholder="Название папки" />

        <SettingsSelectInput values={lifePeriods} onChange={setLifePeriod} />

        <SettingsSelectInput values={syntaxHighlightingLanguages} onChange={setLifePeriod} />

        <SettingsSelectInput values={translateLanguages} onChange={setLifePeriod} />

        <Button className={styles.publishButton} sx={{
          background: theme.palette.primary.main,
          color: theme.palette.primary.dark,
          borderRadius: 2
        }}
          onClick={() => onPublish()}
        >
          Опубликовать
        </Button>
      </Stack>
    </Box>
  );
};

export default ResourceCreationSettings;
