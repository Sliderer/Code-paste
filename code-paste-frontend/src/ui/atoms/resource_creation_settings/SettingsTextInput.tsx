import { TextField } from "@mui/material";
import StylingProps from "../../../helpers/StylingProps";

const SettingsTextInput = ({
  id,
  stylingProps,
  placeholder,
  type,
  onChange,
}: {
  id?: string;
  stylingProps: StylingProps;
  placeholder: string;
  type?: string;
  onChange?: (value: string) => void;
}) => {
  return (
    <TextField
      id={id}
      variant="standard"
      slotProps={{
        input: {
          disableUnderline: true,
        },
      }}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
      placeholder={placeholder}
      type={type}
      className={stylingProps.styles.settingsTextInput}
      sx={{ paddingLeft: 1, paddingRight: 1 }}
    ></TextField>
  );
};

export default SettingsTextInput;
