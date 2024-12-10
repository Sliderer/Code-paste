import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import SearchBar from "../atoms/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/CreateResourceButton";

const Header = () => {
    return <VStack>
        <HStack>
            <SearchBar />
            <CreateResourceButton />
            <HeaderProfilePanel />
        </HStack>
        <hr/>
    </VStack>
}

export default Header;