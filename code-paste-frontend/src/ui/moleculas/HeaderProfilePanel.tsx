import { HStack, Text} from "@chakra-ui/react";
import HeaderProfilePanelIcon from "../atoms/HeaderProfilePanelIcon";

const HeaderProfilePanel = () => {
    return <HStack>
        <HeaderProfilePanelIcon/>
        <Text>Nickname</Text>
    </HStack>
}

export default HeaderProfilePanel;