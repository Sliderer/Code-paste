import { IconButton, Stack, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import SettingsTextInput from "./resource_creation_settings/SettingsTextInput";
import { Check } from "@mui/icons-material";

const ChangableText = ({
  defaultText,
  validate,
  onChange,
}: {
  defaultText: string;
  validate: (value: string) => boolean;
  onChange: (value: string) => void;
}) => {
  const [text, setText] = useState(defaultText);
  const [inEditMode, setInEditMode] = useState(false);

  const changeMode = () => {
    setInEditMode(!inEditMode);
  };

  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"}>
      {inEditMode ? (
        <SettingsTextInput
          key={"email"}
          placeholder={text}
          onChange={setText}
        />
      ) : (
        <Typography>{text}</Typography>
      )}

      {inEditMode ? (
        <IconButton onClick={changeMode}>
          <Check />{" "}
        </IconButton>
      ) : (
        <IconButton onClick={changeMode}>
          <CreateIcon />{" "}
        </IconButton>
      )}
    </Stack>
  );
};

export default ChangableText;
