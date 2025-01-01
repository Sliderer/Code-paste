import React from "react";
import { Container, Stack } from "@mui/material";
import ResourceInputField from "../../ui/atoms/ResourceInputField";
import ResourceCreationSettings from "../../ui/moleculas/ResourceCreationSettings";

class ResourceCreationPage extends React.Component {
  render(): React.ReactNode {
    return (
      <Stack direction={"row"} sx={{ display: "flex", margin: 5, justifyContent: "space-between", justifyItems: "center"}}>
        <ResourceInputField />
        <ResourceCreationSettings />
      </Stack>
    );
  }
}

export default ResourceCreationPage;
