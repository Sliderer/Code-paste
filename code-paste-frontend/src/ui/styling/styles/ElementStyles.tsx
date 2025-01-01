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

    const headerPanelButton = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicButton,
    }

    const headerPanel = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicPanel,
        borderRadius: "15px",
        padding: "15px 0px 15px 50px",
        display: "flex",
        justifyContent: "space-evenly",
        minWidth: "100px"
    }

    const createResourcePanel = {
        ...basicStyles.basicPanel,
    }

    const settingsPanel = {
        ...basicStyles.basicShadow,
        display: "block",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "top",
        borderRadius: 10,
        padding: 40,
        marginLeft: 5
    }

    const settingBox = {
        ...basicStyles.lightShadow,
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
        ...basicStyles.basicButton,
        marginTop: "40px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "center",
    }

    const searchBar = {
        ...basicStyles.lightShadow,
        alignContent: "center",
        borderRadius: "10px 0px 0px 10px",
        border: "0px"
    }

    const searchButton = {
        ...headerPanelButton,
        ...basicStyles.lightShadow,
        alignContent: "center",
        display: "flex",
        alignItems: "center",
        borderRadius: "0px 10px 10px 0px !important",
    }
    
    return {
        ...basicStyles,
        resourceInputFieldStyle: resourceInputFieldStyle,
        headerPanelButton: headerPanelButton,
        headerPanel: headerPanel,
        settingBox: settingBox,
        publishButton: publishButton,
        settingsPanel: settingsPanel,
        searchBar: searchBar,
        createResourcePanel: createResourcePanel,
        searchButton: searchButton,
    }
}

export const useStyles = makeStyles(cunstructStyles);