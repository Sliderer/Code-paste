import { MenuItem, Select, SelectChangeEvent} from "@mui/material";
import { useState } from "react";
import StylingProps from "../../../helpers/StylingProps";

const SettingsSelectInput = ({
  stylingProps,
  values,
  onChange,
}: {
  stylingProps: StylingProps;
  values: string[];
  onChange: Function;
}) => {
  const [currentValue, setCurrentValue] = useState(values[0]);

  const onValueChange = (event: SelectChangeEvent<string>) => {
    let newValue = event.target.value;
    onChange(newValue);
    setCurrentValue(newValue);
  };

  return (
    <Select
      value={currentValue}
      sx={{ color: stylingProps.theme.palette.primary.dark }}
      onChange={onValueChange}
      variant="standard"
      disableUnderline={true}
      className={stylingProps.styles.selectPanel}
    >
      {values.map((value) => (
        <MenuItem value={value} className={stylingProps.styles.selectMenuItem}>
          {value}
        </MenuItem>
      ))}
    </Select>
  );
};

export default SettingsSelectInput;
