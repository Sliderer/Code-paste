import { Box } from "@mui/material";
import "../styling/file.css";
import StylingProps from "../../helpers/StylingProps";
import CodeMirror from "@uiw/react-codemirror";
import "../css/code_editor_style.css";
import {
  getLanguageSyntax,
  getCodeEditorTheme,
} from "../../helpers/CodeEditorHelpers";

const ResourceInputField = ({
  id,
  stylingProps,
  highlightSyntax,
  onTextUpdate,
}: {
  id?: string;
  stylingProps: StylingProps;
  highlightSyntax: string;
  onTextUpdate: (value: string) => void;
}) => {
  const highlightSyntaxLanguage = getLanguageSyntax(highlightSyntax);
  return (
    <Box id={id} className={stylingProps.styles.resourceInputFieldStyle}>
      <CodeMirror
        theme={getCodeEditorTheme(stylingProps)}
        className="cm-editor"
        onChange={onTextUpdate}
        extensions={highlightSyntaxLanguage ? [highlightSyntaxLanguage] : []}
      ></CodeMirror>
    </Box>
  );
};

export default ResourceInputField;
