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
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import SettingsSelectInput from "../atoms/resource_creation_settings/SettingsSelectInput";
type ChangeHandler = (highlightSettings: any) => void;

const ResourceCreationSettings = ({
  onTranslateLanguageChange,
  onProgrammingLanguageChange,
  onFileNameChange,
  onFolderNameChange,
  onPasswordChange,
  onPublish,
}: {
  onTranslateLanguageChange: ChangeHandler;
  onProgrammingLanguageChange: ChangeHandler;
  onFileNameChange: ChangeHandler;
  onFolderNameChange: ChangeHandler;
  onPasswordChange: ChangeHandler
  onPublish: Function;
}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const lifePeriods = [
    "Никогда не удалять",
    "1 час",
    "1 день",
    "1 неделя",
    "1 месяц",
  ];
  const syntaxHighlightingLanguages = [
    "Текст",
    "C++",
    "Python",
    "Java",
    "Json",
    "Protobuf",
  ];
  const translateLanguages = ["Русский", "Английский", "Испанский", "Немецкий"];
  const [lifePeriod, setLifePeriod] = useState(lifePeriods[0]);

  return (
    <Box className={styles.settingsPanel}>
      <Stack display={"grid"} spacing={5}>
        <SettingsTextInput
          key={"fileName"}
          placeholder="Имя"
          onChange={onFileNameChange}
        />

        <SettingsTextInput
          key={"password"}
          placeholder="Пароль"
          type="password"
          onChange={onPasswordChange}
        />

        <SettingsTextInput
          key={"folderName"}
          placeholder="Название папки"
          onChange={onFolderNameChange}
        />

        <SettingsSelectInput
          key={"lifePeriod"}
          values={lifePeriods}
          onChange={setLifePeriod}
        />

        <SettingsSelectInput
          key={"highlitingSyntax"}
          values={syntaxHighlightingLanguages}
          onChange={setLifePeriod}
        />

        <SettingsSelectInput
          key={"translateSyntax"}
          values={translateLanguages}
          onChange={setLifePeriod}
        />

        <Button
          className={styles.publishButton}
          sx={{
            background: theme.palette.primary.main,
            color: theme.palette.primary.dark,
            borderRadius: 2,
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
