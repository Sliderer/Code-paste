import { MenuItem, Select, SelectChangeEvent, useTheme } from "@mui/material"
import { useStyles } from "../../styling/styles/ElementStyles";
import { ChangeEvent, useState } from "react";

const SettingsSelectInput = ({values, onChange}: {values: string[], onChange: Function}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    const [currentValue, setCurrentValue] = useState(values[0]);

    const onValueChange = (event: SelectChangeEvent<string>) => {
        let newValue = event.target.value;
        onChange(newValue);
        setCurrentValue(newValue);
    }

    return <Select value={currentValue} sx={{ color: theme.palette.primary.dark }} onChange={onValueChange} variant="standard" disableUnderline={true} className={styles.selectPanel}>
        {
            values.map(value =>
                <MenuItem value={value} className={styles.selectMenuItem}>{value}</MenuItem>
            )
        }
    </Select>
}

export default SettingsSelectInput;