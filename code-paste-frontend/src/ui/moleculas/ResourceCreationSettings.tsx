import { Box, Button, VStack } from "@chakra-ui/react";
import VariantSelector from "../atoms/VariantSelector";

const ResourceCreationSettings = () => {
  return (
    <Box>
      <VStack>
        <VariantSelector values={['C++', 'Python', 'Java', 'Json', 'Protobuf']}/>
        <VariantSelector values={['Русский', 'Английский', 'Испанский', 'Немецкий']}/>
        <Button>Опубликовать</Button>
      </VStack>
    </Box>
  );
};

export default ResourceCreationSettings;
