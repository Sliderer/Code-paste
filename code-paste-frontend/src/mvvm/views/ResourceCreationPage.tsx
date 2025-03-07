import { Stack, useTheme } from "@mui/material";
import ResourceInputField from "../../ui/atoms/ResourceInputField";
import ResourceCreationSettings from "../../ui/moleculas/ResourceCreationSettings";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { useCallback, useEffect, useState } from "react";
import { ResourceCreationViewModel } from "../view_models/ResourceCreationViewModel";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";

const ResourceCreationPage = observer(
  ({ viewModel }: { viewModel: ResourceCreationViewModel }) => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [programmingLanguageHighlight, setProgrammingLanguageHighlight] =
      useState("text");

    const stylingProps = {
      theme: useTheme(),
      styles: useStyles(useTheme()),
    };

    useEffect(() => {
      if (viewModel.createdResource !== undefined) {
        let resourceUuid = viewModel.createdResource;
        viewModel.createdResource = undefined;
        navigate(`/resource/${resourceUuid}`);
      }
    }, [viewModel.createdResource]);

    const onHighlightLanguageChange = useCallback(
      (highlightSettings: string) => {
        setProgrammingLanguageHighlight(highlightSettings);
        viewModel.setHightlightSetting(highlightSettings);
      },
      []
    );

    const onTranslateLanguageChange = useCallback((language: string) => {
      viewModel.setLanguage(language);
    }, []);

    const onTTLChange = useCallback((ttl: string) => {
      viewModel.setTTL(ttl);
    }, []);

    const onFileNameChange = useCallback((value: string) => {
      viewModel.setFileName(value);
    }, []);

    const onFolderNameChange = useCallback((value: string) => {
      viewModel.setFolder(value);
    }, []);

    const onPasswordChange = useCallback((value: string) => {
      viewModel.setPassword(value);
    }, []);

    const uploadResource = () => {
      const validationResult = viewModel.validateData();
      if (validationResult.isValid) {
        viewModel.uploadResource();
      } else {
        setError(validationResult.error);
      }
    };

    return (
      <Stack
        direction={"row"}
        className={stylingProps.styles.basicPanel}
        spacing={5}
        sx={{ justifyContent: "space-between" }}
      >
        <ResourceInputField
          stylingProps={stylingProps}
          highlightSyntax={programmingLanguageHighlight}
          onTextUpdate={viewModel.setText}
        />
        <ResourceCreationSettings
          translateLanguages={viewModel.getTranslateLanguages()}
          ttlOptions={viewModel.getTTLOptions()}
          onFileNameChange={onFileNameChange}
          onFolderNameChange={onFolderNameChange}
          onHighlightLanguageChange={onHighlightLanguageChange}
          onTranslateLanguageChange={onTranslateLanguageChange}
          onPasswordChange={onPasswordChange}
          onPublish={uploadResource}
          onTTLChange={onTTLChange}
          error={error}
        />
      </Stack>
    );
  }
);

export default ResourceCreationPage;
