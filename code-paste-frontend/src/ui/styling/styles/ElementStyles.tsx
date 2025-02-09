import { makeStyles } from "@mui/styles";
import { cunstructBasicStyles } from "./BasicStyles";
import { Theme } from "@mui/material";
import { Padding } from "@mui/icons-material";

function cunstructStyles(theme: Theme) {
    const basicStyles = cunstructBasicStyles(theme);

    const resourceInputFieldStyle = {
        ...basicStyles.basicShadow,
        ...basicStyles.noOutlineOnFocus,
        width: "75%",
        padding: "10px",
        borderRadius: "10px"
    };

    const headerPanelButton = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicButton,
    };

    const headerPanel = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicPanel,
        borderRadius: "15px",
        minWidth: "300px",
        overflow: "hidden",
        padding: "15px 0px 15px 50px",
    };

    const radioButton = {
        color: theme.palette.primary.main,
        '&.Mui-checked': {
            color: theme.palette.primary.main,
        },
    };

    const createResourcePanel = {
        ...basicStyles.basicPanel,
    };

    const panelWithShadow = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicPanel,
        borderRadius: 10
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
    };

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
    };

    const publishButton = {
        ...basicStyles.basicShadow,
        ...basicStyles.basicButton,
        display: "flex",
        justifyContent: "center",
    };

    const searchBar = {
        ...basicStyles.lightShadow,
        alignContent: "center",
        display: "block",
        borderRadius: "10px 0px 0px 10px",
        border: "0px",
        minWidth: "400px"
    };

    const settingsTextInput = {
        ...basicStyles.noOutlineOnFocus,
        ...basicStyles.textStyle, 
        ...basicStyles.lightShadow,
        borderRadius: 10,
    };

    const selectPanel = {
        ...basicStyles.lightShadow,
        ...basicStyles.noOutlineOnFocus,
        border: 'none',
        outline: 'none',
        paddingLeft: "10px",
        paddingRight: "10px",
        borderRadius: 10
    };

    const selectMenuItem = {
        borderRadius: 10,
        color: theme.palette.primary.dark,
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
        radioButton: radioButton,
        settingsTextInput: settingsTextInput,
        selectPanel: selectPanel,
        selectMenuItem: selectMenuItem,
        panelWithShadow: panelWithShadow
    }
}

export const useStyles = makeStyles(cunstructStyles);