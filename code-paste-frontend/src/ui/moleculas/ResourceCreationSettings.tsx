import React from "react";
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

const ResourceCreationSettings = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  const settings = [
    ["Текст", "C++", "Python", "Java", "Json", "Protobuf"],
    ["Русский", "Английский", "Испанский", "Немецкий"],
  ];

  return (
    <Box
      className={styles.settingsPanel}
    >
      <Stack display={"grid"}>
        {settings.map((setting) => (
          <Box className={styles.settingBox}>
            <RadioGroup defaultValue={setting[0]}>
              {setting.map((label) => (
                <FormControlLabel
                  value={label}
                  control={<Radio />}
                  label={label}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}

        <Box className={styles.publishButton}>
          <Button sx={{
            color: "inherit",
          }}>
            Опубликовать
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default ResourceCreationSettings;
