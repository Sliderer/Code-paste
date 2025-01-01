import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Box, Stack, useTheme } from "@mui/material";
import { useStyles } from "../styling/styles/ElementStyles";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import "../styling/file.css";

const ResourceInputField = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [text, setText] = useState(
    "var message = 'Monaco Editor!' \nconsole.log(message);"
  );

  return (
    <Box className={classes.resourceInputFieldStyle}>
      <Stack
        direction={"row"}
        sx={{
          border: "none",
          minHeight: "100px",
          height: "100%",
          padding: "5px",
          outline: "none",
        }}
      >
        <Editor
          value={text}
          padding={10}
          onValueChange={(code) => setText(code)}
          highlight={(code) => highlight(code, languages.js, 'js')}
          className={classes.noOutlineOnFocus}
          textareaClassName="code-editor"
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            height: "100%",
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
