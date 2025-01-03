import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  useTheme,
} from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import { languages } from "prismjs";

type ChangeHandler = (highlightSettings: any) => void;

const ResourceCreationSettings = ({ onTranslateLanguageChange, onProgrammingLanguageChange, onPublish }: { onTranslateLanguageChange: ChangeHandler, onProgrammingLanguageChange: ChangeHandler, onPublish: Function}) => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const settings = [
    {
      labels: ["Текст", "C++", "Python", "Java", "Json", "Protobuf"],
      onChange: onTranslateLanguageChange,
      highlightSettings: [
        {
          grammar: languages.js,
          language: 'js'
        },
        {
          grammar: languages.clike,
          language: 'clike'
        },
        {
          grammar: languages.py,
          language: 'py'
        },
        {
          grammar: languages.java,
          language: 'java'
        },
        {
          grammar: languages.text,
          language: 'text'
        },
        {
          grammar: languages.protobuf,
          language: 'protobuf'
        }
      ]
    },
    {
      labels: ["Русский", "Английский", "Испанский", "Немецкий"],
      onChange: onProgrammingLanguageChange,
      highlightSettings: ["Русский", "Английский", "Испанский", "Немецкий"]
    }
  ];

  return (
    <Box
      className={styles.settingsPanel}
    >
      <Stack display={"grid"}>
        {settings.map((setting) => (
          <Box className={styles.settingBox}>
            <RadioGroup defaultValue={setting.labels[0]}>
              {setting.labels.map((label, index) => (
                <FormControlLabel
                  value={label}
                  control={<Radio
                    onChange={() => { setting.onChange(setting.highlightSettings[index]); }}
                    sx={{
                      color: theme.palette.primary.main,
                      '&.Mui-checked': {
                        color: theme.palette.primary.main,
                      },
                    }}
                    color="primary" />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}

        <Button className={styles.publishButton} sx={{
          marginTop: 5,
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
