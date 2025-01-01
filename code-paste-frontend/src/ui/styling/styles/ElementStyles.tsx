import { makeStyles } from "@mui/styles";
import { cunstructBasicStyles } from "./BasicStyles";
import { Theme } from "@mui/material";

function cunstructStyles(theme: Theme) {
    const basicStyles = cunstructBasicStyles(theme)
    
    const resourceInputFieldStyle = {
        ...basicStyles.basicShadow,
        ...basicStyles.noOutlineOnFocus,
        width: "75%",
        padding: "10px",
        borderRadius: "10px"
    }

    const createResourceButton = {
        ...basicStyles.basicShadow,
        ...basicStyles.textStyle,
    }

    const headerPanel = {
        ...basicStyles.basicShadow,
        padding: "20px",
        borderRadius: "15px"
    }

    const settingsPanel = {
        ...basicStyles.basicShadow,
        display: "block",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 10,
        padding: 40,
        marginLeft: 5
    }

    const settingBox = {
        ...basicStyles.basicShadow,
        ...basicStyles.textStyle,
        minWidth: "100px",
        marginTop: 40,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 50,
        paddingRight: 50,
        borderRadius: 10,
    } 

    const publishButton = {
        ...basicStyles.basicShadow,
        ...basicStyles.textStyle,
        marginTop: "20px",
        marginBottom: "20px",
        borderRadius: 10,
        display: "flex",
        justifyContent: "center"
    }
    
    return {
        ...basicStyles,
        resourceInputFieldStyle: resourceInputFieldStyle,
        createResourceButton: createResourceButton,
        headerPanel: headerPanel,
        settingBox: settingBox,
        publishButton: publishButton,
        settingsPanel: settingsPanel
    }
}

export const useStyles = makeStyles(cunstructStyles);