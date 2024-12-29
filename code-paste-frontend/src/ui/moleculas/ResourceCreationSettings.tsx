import { Box, Button, Stack } from "@mui/material";
import VariantSelector from "../atoms/VariantSelector";

const ResourceCreationSettings = () => {
  const settings = [
    <VariantSelector values={['C++', 'Python', 'Java', 'Json', 'Protobuf']} />,
    <VariantSelector values={['Русский', 'Английский', 'Испанский', 'Немецкий']} />,
  ]
  return (
    <Box 
      sx={{
        width: "20%",
        display: "block",
        justifyContent: "center",
        justifyItems: "center",
        alignItems: "center",
        alignContent: "center",
        borderRadius: 5,
        boxShadow: "0px 10px 20px 1px rgba(0, 0, 255, .2)"
      }}>
      <Stack display={"grid"}>
        {
          settings.map(setting =>
            <Box 
            sx={{
              margin: 2,
              padding: 5,
              borderRadius: 5,
              boxShadow: "0px 10px 20px 1px rgba(0, 0, 255, .2)"
            }}>
              {setting}
            </Box>
          )
        }
        <Button
        sx={{
          margin: 2,
          background: "white",
          color: "black",
          borderRadius: 4,
          justifyContent: "center",
          boxShadow: "0px 10px 20px 1px rgba(0, 0, 255, .2)"
        }}>
          Опубликовать
        </Button>
      </Stack>

    </Box>
  );
};

export default ResourceCreationSettings;
