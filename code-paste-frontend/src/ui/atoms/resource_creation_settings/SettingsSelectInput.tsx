import { MenuItem, Select, useTheme } from "@mui/material"
import { useStyles } from "../../styling/styles/ElementStyles";

const SettingsSelectInput = ({values, onChange}: {values: string[], onChange: Function}) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return <Select value={values[0]} sx={{ color: theme.palette.primary.dark }} onChange={e => onChange(e.target.value)} variant="standard" disableUnderline={true} className={styles.selectPanel}>
        {
            values.map(value =>
                <MenuItem value={value} className={styles.selectMenuItem}>{value}</MenuItem>
            )
        }
    </Select>
}

export default SettingsSelectInput;