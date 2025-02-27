import { useState } from "react";
import { Box, Stack } from "@mui/material";
import { highlight } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-java";
import "prismjs/components/prism-python";
import "prismjs/themes/prism.css";
import "../styling/file.css";
import { HighlightingSyntax } from "../../helpers/HighlightingSyntax";
import Editor from "react-simple-code-editor";
import StylingProps from "../../helpers/StylingProps";

const ResourceInputField = ({
  stylingProps,
  highlightSyntax,
  onTextUpdate,
  getTextDefaultValue,
}: {
  stylingProps: StylingProps;
  highlightSyntax: HighlightingSyntax;
  onTextUpdate: Function;
  getTextDefaultValue: Function;
}) => {
  const [text, setText] = useState(getTextDefaultValue());

  const foo = (code: string) => {
    return highlight(code, highlightSyntax.grammar, highlightSyntax.language);
  };

  const updateText = (text: string) => {
    onTextUpdate(text);
    setText(text);
  };

  return (
    <Box className={stylingProps.styles.resourceInputFieldStyle}>
      <Stack
        direction={"row"}
        sx={{
          border: "none",
          padding: "5px",
          outline: "none",
        }}
      >
        <Editor
          value={text}
          padding={10}
          onValueChange={(text) => updateText(text)}
          highlight={foo}
          textareaClassName="code-editor"
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            height: "100",
            fontFamily: "monospace",
            overflow: "auto",
            fontSize: 17,
          }}
        />
      </Stack>
    </Box>
  );
};

export default ResourceInputField;
