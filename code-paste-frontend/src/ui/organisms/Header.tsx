import SearchBar from "../atoms/SearchBar";
import HeaderProfilePanel from "../moleculas/HeaderProfilePanel";
import CreateResourceButton from "../atoms/CreateResourceButton";
import { Grid2, Stack } from "@mui/material";

const Header = () => {
    return <Stack direction={"column"} sx={{margin: 5, background: "gray"}}>
        <Stack spacing={20} direction={"row"} justifyContent={"center"} sx={{display: "flex", maxHeight: "50px"}}>
            <SearchBar />
            <CreateResourceButton />
            <HeaderProfilePanel />
        </Stack>
    </Stack>
}

export default Header;