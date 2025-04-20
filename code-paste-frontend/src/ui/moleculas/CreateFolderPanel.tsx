import { Box, Button, Stack } from "@mui/material";
import SettingsTextInput from "../atoms/resource_creation_settings/SettingsTextInput";
import StylingProps from "../../helpers/StylingProps";
import { useState } from "react";

const CreateFolderPanel = ({
  stylingProps,
  onCreate,
  onClose,
}: {
  stylingProps: StylingProps;
  onCreate: (value: string) => void;
  onClose: () => void;
}) => {
  const [folderName, setFolderName] = useState("");
  return (
    <Box className={stylingProps.styles.basicPanel}>
      <Stack
        className={stylingProps.styles.panelWithShadow}
        sx={{ padding: "50px", width: "300px" }}
        direction={"column"}
        spacing={2}
      >
        <SettingsTextInput
          stylingProps={stylingProps}
          placeholder={"Имя папки"}
          onChange={setFolderName}
        ></SettingsTextInput>
        <Button
          className={stylingProps.styles.basicShadow}
          sx={{
            backgroundColor: stylingProps.theme.palette.primary.main,
            color: stylingProps.theme.palette.primary.dark,
            borderRadius: 3,
          }}
          onClick={(_) => onCreate(folderName)}
        >
          Добавить
        </Button>
        <Button onClick={onClose}>Назад</Button>
      </Stack>
    </Box>
  );
};

export default CreateFolderPanel;
