import { TextField, useTheme } from "@mui/material"
import { useStyles } from "../../styling/styles/ElementStyles";

const SettingsTextInput = ({ placeholder, type }: { placeholder: string, type?: string }) => {
    const theme = useTheme();
    const styles = useStyles(theme);
    return <TextField variant="standard"
        slotProps={{
            input: {
                disableUnderline: true,
            },
        }}
        placeholder={placeholder}
        type={type}
        className={styles.settingsTextInput} sx={{paddingLeft: 1, paddingRight: 1}}></TextField>
}

export default SettingsTextInput;