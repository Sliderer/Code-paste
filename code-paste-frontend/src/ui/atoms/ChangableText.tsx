import { IconButton, Stack, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useState } from "react";
import SettingsTextInput from "./resource_creation_settings/SettingsTextInput";
import { Check, TypeSpecimenOutlined } from "@mui/icons-material";
import ValidationResult from "../../helpers/ValidationResult";

const ChangableText = ({
  defaultText,
  validate,
  onChange,
}: {
  defaultText: string;
  validate: (value: string) => ValidationResult;
  onChange: (value: string) => void;
}) => {
  const [text, setText] = useState(defaultText.length > 0 ? defaultText : "Не введен");
  const [inEditMode, setInEditMode] = useState(false);
  const [error, setError] = useState("");

  const changeMode = () => {
    setError("");
    let validationResult = validate(text);
    if (validationResult.result === true) {
      if (inEditMode === true) {
        onChange(text);
      }
      setInEditMode(!inEditMode);
    } else {
      setError(validationResult.error);
    }
  };

  return (
    <Stack>
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
      <Typography sx= {{}}>{error}</Typography>
    </Stack>
  );
};

export default ChangableText;
