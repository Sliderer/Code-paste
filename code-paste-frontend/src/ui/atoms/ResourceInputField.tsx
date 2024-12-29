
import { TextField } from "@mui/material";
import { inputFocuse } from "../css/css";

const ResourceInputField = () => {
    return <TextField multiline rows={45} sx={{
        outline: "none",
        boxShadow: "0px 0px 15px 10px rgba(0, 0, 255, .2)",
        width: "70%",
        textAlign: "left"
    }}/>
}

export default ResourceInputField;