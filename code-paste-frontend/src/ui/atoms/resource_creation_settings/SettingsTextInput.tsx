import { TextField } from "@mui/material"
import StylingProps from "../../../helpers/StylingProps";

const SettingsTextInput = ({ stylingProps, placeholder, type, onChange }: { stylingProps: StylingProps, placeholder: string, type?: string, onChange?: (value: string) => void}) => {
    return <TextField variant="standard"
        slotProps={{
            input: {
                disableUnderline: true,
            },
        }}
        onChange={e => {
            if (onChange) {
                onChange(e.target.value)
            }
        }}
        placeholder={placeholder}
        type={type}
        className={stylingProps.styles.settingsTextInput} sx={{paddingLeft: 1, paddingRight: 1}}></TextField>
}

export default SettingsTextInput;