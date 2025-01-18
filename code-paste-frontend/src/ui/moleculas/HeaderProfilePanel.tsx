import { Box, Stack, Typography, useTheme } from "@mui/material";
import HeaderProfilePanelIcon from "../atoms/header/HeaderProfilePanelIcon";
import { useStyles } from "../styling/styles/ElementStyles";
import { Link } from "react-router-dom";
import { getCurrentNickname } from "../../helpers/SessionController";

const HeaderProfilePanel = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const nickname = getCurrentNickname();
  
  return (
    <Stack direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
      <HeaderProfilePanelIcon />
      {nickname == null ? (
        <Link
          className={styles.textStyle}
          style={{ textDecoration: "none" }}
          to={`/enter`}
        >
          Войти
        </Link>
      ) : (
        <Link
          className={styles.textStyle}
          style={{ textDecoration: "none" }}
          to={`/account/${nickname}`}
        >
          {nickname}
        </Link>
      )}
    </Stack>
  );
};

export default HeaderProfilePanel;
