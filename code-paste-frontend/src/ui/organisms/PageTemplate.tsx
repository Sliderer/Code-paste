import Header from "./Header";
import { ThemeProvider, useTheme } from "@mui/material";
import { lightTheme } from "../styling/themes";
import { ReactNode } from "react";
import { useStyles } from "../styling/styles/ElementStyles";

const PageTemplate = ({
  page,
  needHeader,
}: {
  page: ReactNode;
  needHeader?: boolean;
}) => {

  return (
    <ThemeProvider theme={lightTheme}>
      {needHeader && <Header />}
      {page}
    </ThemeProvider>
  );
};

export default PageTemplate;
