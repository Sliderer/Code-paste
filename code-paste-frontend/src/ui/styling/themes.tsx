import { createTheme } from '@mui/material/styles';
import './fonts.css';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#d5bdaf",
      dark: "#936639",
      contrastText: '#ffff',
    },
    background: {
      default: "#c9ada7"
    },
  },
  typography: {
    allVariants: {
      color: "#936639"
    },
    fontFamily: "Montserrat Alternates"
  },
});
