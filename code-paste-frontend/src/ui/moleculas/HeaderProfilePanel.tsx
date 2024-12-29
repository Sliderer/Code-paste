import { Stack, TextField } from "@mui/material";
import HeaderProfilePanelIcon from "../atoms/HeaderProfilePanelIcon";

const HeaderProfilePanel = () => {
    return <>
        <HeaderProfilePanelIcon/>
        <TextField>Nickname</TextField>
    </>
}

export default HeaderProfilePanel;