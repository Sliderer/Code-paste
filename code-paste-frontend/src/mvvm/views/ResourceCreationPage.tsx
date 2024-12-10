import { Container, HStack } from "@chakra-ui/react";
import React from "react";
import ResourceInputField from "../../ui/atoms/ResourceInputField";
import ResourceCreationSettings from "../../ui/moleculas/ResourceCreationSettings";

class ResourceCreationPage extends React.Component {
  render(): React.ReactNode {
    return (
      <Container fluid={true} minHeight="80vh">
        <HStack>
          <ResourceInputField />
          <ResourceCreationSettings />
        </HStack>
      </Container>
    );
  }
}

export default ResourceCreationPage;
