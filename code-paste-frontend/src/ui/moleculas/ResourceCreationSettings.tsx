import { useState } from "react";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import SettingsSelectInput from "../atoms/resource_creation_settings/SettingsSelectInput";
type ChangeHandler = (highlightSettings: any) => void;

const ResourceCreationSettings = ({
  translateLanguages,
  onTranslateLanguageChange,
  onHighlightLanguageChange,
  onFileNameChange,
  onFolderNameChange,
  onPasswordChange,
  onPublish,
  error
}: {
  translateLanguages: string[];
  onTranslateLanguageChange: ChangeHandler;
  onHighlightLanguageChange: ChangeHandler;
  onFileNameChange: ChangeHandler;
  onFolderNameChange: ChangeHandler;
  onPasswordChange: ChangeHandler;
  onPublish: Function;
  error: string;
}) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

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
    "HTML",
  ];

  const [lifePeriod, setLifePeriod] = useState(lifePeriods[0]);

  return (
    <Box className={stylingProps.styles.settingsPanel}>
      <Stack display={"grid"} spacing={5} sx={{width: "15vw"}}>
        <SettingsTextInput
          stylingProps={stylingProps}
          key={"fileName"}
          placeholder="Имя"
          onChange={onFileNameChange}
        />

        <SettingsTextInput
          stylingProps={stylingProps}
          key={"password"}
          placeholder="Пароль"
          type="password"
          onChange={onPasswordChange}
        />

        <SettingsTextInput
          stylingProps={stylingProps}
          key={"folderName"}
          placeholder="Название папки"
          onChange={onFolderNameChange}
        />

        <SettingsSelectInput
          stylingProps={stylingProps}
          key={"lifePeriod"}
          values={lifePeriods}
          onChange={setLifePeriod}
        />

        <SettingsSelectInput
          stylingProps={stylingProps}
          key={"highlitingSyntax"}
          values={syntaxHighlightingLanguages}
          onChange={onHighlightLanguageChange}
        />

        <SettingsSelectInput
          stylingProps={stylingProps}
          key={"translateLanguage"}
          values={translateLanguages}
          onChange={onTranslateLanguageChange}
        />
        <Typography sx={{textAlign: "center"}}>{error}</Typography>
        <Button 
          className={stylingProps.styles.publishButton}
          sx={{
            background: stylingProps.theme.palette.primary.main,
            color: stylingProps.theme.palette.primary.dark,
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
