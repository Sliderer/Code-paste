import { Box, Stack } from "@mui/material";
import { ResourceAction } from "../../helpers/ResourceAction";
import ResourceActionButton from "../atoms/ResourceActionButton";
import StylingProps from "../../helpers/StylingProps";
import ResourceModel from "../../mvvm/models/ResourceModel";
import {
  getCodeEditorTheme,
  getLanguageSyntax,
} from "../../helpers/CodeEditorHelpers";
import CodeMirror from "@uiw/react-codemirror";
import "../css/code_editor_style.css";

const ResourceDemonstrationPanel = ({
  stylingProps,
  resource,
  actions,
}: {
  stylingProps: StylingProps;
  resource: ResourceModel;
  actions: ResourceAction[];
}) => {
  const highlightSyntaxLanguage = getLanguageSyntax(resource.highlightSetting);

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Stack spacing={5}>
        <Stack direction={"row"} spacing={4} justifyContent={"center"}>
          {actions.map((action, index) => (
            <ResourceActionButton
              stylingProps={stylingProps}
              key={index}
              action={action}
            />
          ))}
        </Stack>
        <Box
          className={stylingProps.styles.basicShadow}
          sx={{
            padding: 1,
            borderRadius: 1,
            height: "70vh",
            width: "90vw",
          }}
        >
          <CodeMirror
            theme={getCodeEditorTheme(stylingProps)}
            className="cm-editor"
            value={resource.resource.text}
            editable={false}
            extensions={
              highlightSyntaxLanguage ? [highlightSyntaxLanguage] : []
            }
          ></CodeMirror>
        </Box>
      </Stack>
    </Box>
  );
};

export default ResourceDemonstrationPanel;
