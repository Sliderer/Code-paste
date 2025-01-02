import { createTheme } from '@mui/material/styles';
import './fonts.css';

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#d5bdaf",
      light: "#936639",
    },
    background: {
      default: "#c9ada7"
    },
  },
  typography: {
    fontFamily: "Montserrat Alternates"
  },
});
