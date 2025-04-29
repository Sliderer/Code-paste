import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import SettingsSelectInput from "../atoms/resource_creation_settings/SettingsSelectInput";
type ChangeHandler = (highlightSettings: any) => void;

const ResourceCreationSettings = ({
  translateLanguages,
  ttlOptions,
  onTranslateLanguageChange,
  onHighlightLanguageChange,
  onFileNameChange,
  onFolderNameChange,
  onPasswordChange,
  onTTLChange,
  onPublish,
  error,
}: {
  translateLanguages: string[];
  ttlOptions: string[];
  onTranslateLanguageChange: ChangeHandler;
  onHighlightLanguageChange: ChangeHandler;
  onFileNameChange: ChangeHandler;
  onFolderNameChange: ChangeHandler;
  onPasswordChange: ChangeHandler;
  onTTLChange: ChangeHandler;
  onPublish: Function;
  error: string;
}) => {
  const stylingProps = {
    theme: useTheme(),
    styles: useStyles(useTheme()),
  };

  const syntaxHighlightingLanguages = [
    "Текст",
    "C++",
    "Python",
    "Java",
    "Json",
    "HTML",
  ];

  return (
    <Box className={stylingProps.styles.settingsPanel}>
      <Stack display={"grid"} spacing={5} sx={{ width: "15vw" }}>
        <SettingsTextInput
          id='filename_placeholder'
          stylingProps={stylingProps}
          key={"fileName"}
          placeholder="Имя"
          onChange={onFileNameChange}
        />

        <SettingsTextInput
          id='password_placeholder'
          stylingProps={stylingProps}
          key={"password"}
          placeholder="Пароль"
          type="password"
          onChange={onPasswordChange}
        />

        <SettingsTextInput
          id='folder_name_placeholder'
          stylingProps={stylingProps}
          key={"folderName"}
          placeholder="Название папки"
          onChange={onFolderNameChange}
        />

        <SettingsSelectInput
          id='life_period_select'
          stylingProps={stylingProps}
          key={"lifePeriod"}
          values={ttlOptions}
          onChange={onTTLChange}
        />

        <SettingsSelectInput
          id='hoghlight_select'
          stylingProps={stylingProps}
          key={"highlitingSyntax"}
          values={syntaxHighlightingLanguages}
          onChange={onHighlightLanguageChange}
        />

        <SettingsSelectInput
          id='language_select'
          stylingProps={stylingProps}
          key={"translateLanguage"}
          values={translateLanguages}
          onChange={onTranslateLanguageChange}
        />
        <Typography sx={{ textAlign: "center" }}>{error}</Typography>
        <Button
          id='publish_button'
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
