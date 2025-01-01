import { Theme } from "@mui/material";

export function cunstructBasicStyles(theme: Theme) {
    const basicShadow = {
        boxShadow: "0px 15px 25px 1px rgba(0, 0, 255, .2)"
    };

    const textStyle = {
        color: theme.palette.primary.main
    }

    const noOutlineOnFocus = {
        '&:focus': {
            outline: 'none',
        },
    }

    return {
        basicShadow: basicShadow,
        textStyle: textStyle,
        noOutlineOnFocus: noOutlineOnFocus
    }
}
