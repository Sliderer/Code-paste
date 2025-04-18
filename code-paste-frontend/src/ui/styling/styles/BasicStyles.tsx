import { Theme } from "@mui/material";

export function cunstructBasicStyles(theme: Theme) {
    const basicShadow = {
        boxShadow: `0px 5px 20px 4px ${theme.palette.background.default}`
    };

    const lightShadow = {
        boxShadow: `0px 5px 30px 2px ${theme.palette.background.default}`
    };

    const textStyle = {
        color: theme.palette.primary.dark,
        fontFamily: theme.typography.fontFamily
    }

    const headerStyle = {
        ...textStyle,
        padding: 10,
    }

    const noOutlineOnFocus = {
        '&:focus': {
            outline: 'none',
            border: 'none'
        },
    }

    const centerPanel = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
    }

    const basicButton = {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
        borderRadius: 10,
    }

    const basicPanel = {
        display: "flex",
        margin: 40,
        justifyContent: "center",
        justifyItems: "center",
    }

    return {
        basicShadow: basicShadow,
        textStyle: textStyle,
        noOutlineOnFocus: noOutlineOnFocus,
        basicPanel: basicPanel,
        basicButton: basicButton,
        lightShadow: lightShadow,
        headerStyle: headerStyle,
        centerPanel: centerPanel
    }
}
