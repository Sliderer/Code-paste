import { Stack, useTheme } from "@mui/material";
import ResourceInputField from "../../ui/atoms/ResourceInputField";
import ResourceCreationSettings from "../../ui/moleculas/ResourceCreationSettings";
import { useStyles } from "../../ui/styling/styles/ElementStyles";
import { useCallback, useEffect, useState } from "react";
import { languages } from "prismjs";
import { HighlightingSyntax } from "../../helpers/HighlightingSyntax";
import { ResourceCreationViewModel } from "../view_models/ResourceCreationViewModel";
import { observer } from "mobx-react";
import { Navigate, useNavigate } from "react-router-dom";

const ResourceCreationPage = observer(
  ({ viewModel }: { viewModel: ResourceCreationViewModel }) => {
    const [programmingLanguageHighlight, setProgrammingLanguageHighlight] =
      useState<HighlightingSyntax>({
        grammar: languages.java,
        language: "jss",
      });

    const [translateLanguageHighlight, setTranslateLanguageHightlight] =
      useState<HighlightingSyntax>({
        grammar: languages.text,
        language: "",
      });

    const navigate = useNavigate();

    const theme = useTheme();
    const styles = useStyles(theme);

    useEffect(() => {
      if (viewModel.createdResource !== undefined) {
        let resourceUuid = viewModel.createdResource;
        viewModel.createdResource = undefined;
        navigate(`/resource/${resourceUuid}`);
      }
    }, [viewModel.createdResource]);

    const onProgrammingLanguageChange = useCallback(
      (highlightSettings: HighlightingSyntax) => {
        setProgrammingLanguageHighlight(highlightSettings);
      },
      []
    );

    const onTranslateLanguageChange = useCallback(
      (highlightSettings: string) => {},
      []
    );

    const onFileNameChange = useCallback((value: string) => {
      viewModel.setFileName(value);
    }, []);

    const onFolderNameChange = useCallback((value: string) => {
      viewModel.setFolder(value);
    }, []);

    const onPasswordChange = useCallback((value: string) => {
      viewModel.setPassword(value);
    }, []);

    return (
      <Stack
        direction={"row"}
        className={styles.basicPanel}
        sx={{ justifyContent: "space-between" }}
      >
        <ResourceInputField
          highlightSyntax={programmingLanguageHighlight}
          getTextDefaultValue={viewModel.getText}
          onTextUpdate={viewModel.setText}
        />
        <ResourceCreationSettings
          onFileNameChange={onFileNameChange}
          onFolderNameChange={onFolderNameChange}
          onProgrammingLanguageChange={onProgrammingLanguageChange}
          onTranslateLanguageChange={onTranslateLanguageChange}
          onPasswordChange={onPasswordChange}
          onPublish={viewModel.uploadResource}
        />
      </Stack>
    );
  }
);

export default ResourceCreationPage;
