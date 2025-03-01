import { Box } from "@mui/material";
import "../styling/file.css";
import StylingProps from "../../helpers/StylingProps";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";

const getLanguageSyntax = (language: string) => {
  switch (language) {
      case 'Python':
          return python()
      case 'C++':
          return cpp()
      case 'HTML':
          return html()
      case 'Java':
          return java()
      case 'Json':
          return json()
      default:
          return undefined
  }
}

const ResourceInputField = ({
  stylingProps,
  highlightSyntax,
  onTextUpdate,
}: {
  stylingProps: StylingProps;
  highlightSyntax: string;
  onTextUpdate: (value: string) => void;
}) => {

  const highlightSyntaxLanguage = getLanguageSyntax(highlightSyntax)
  return (
    <Box className={stylingProps.styles.resourceInputFieldStyle}>
      <CodeMirror onChange={onTextUpdate} extensions={highlightSyntaxLanguage ? [highlightSyntaxLanguage] : []}></CodeMirror>
    </Box>
  );
};

export default ResourceInputField;
