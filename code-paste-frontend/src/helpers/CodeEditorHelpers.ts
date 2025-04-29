import createTheme from "@uiw/codemirror-themes";
import StylingProps from "./StylingProps";
import { tags as t } from "@lezer/highlight";

import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { html } from "@codemirror/lang-html";
import { java } from "@codemirror/lang-java";
import { json } from "@codemirror/lang-json";

export const getCodeEditorTheme = (stylingProps: StylingProps) => {
    const myTheme = createTheme({
        theme: "light",
        settings: {
          background: "#ffffff",
          backgroundImage: "",
          foreground: "black",
          caret: stylingProps.theme.palette.primary.dark,
          selection: "#f6efe8",
          selectionMatch: "#036dd626",
          lineHighlight: "#f5e1d7",
          gutterBackground: "#fff",
          gutterForeground: "#8a919966",
        },
        styles: [
          { tag: t.comment, color: "#787b8099" },
          { tag: t.variableName, color: "#0080ff" },
          { tag: [t.string, t.special(t.brace)], color: "#5c6166" },
          { tag: t.number, color: "#5c6166" },
          { tag: t.bool, color: "#5c6166" },
          { tag: t.null, color: "#5c6166" },
          { tag: t.keyword, color: "#5c6166" },
          { tag: t.operator, color: "#5c6166" },
          { tag: t.className, color: "#5c6166" },
          { tag: t.definition(t.typeName), color: "#5c6166" },
          { tag: t.typeName, color: "#5c6166" },
          { tag: t.angleBracket, color: "#5c6166" },
          { tag: t.tagName, color: "#5c6166" },
          { tag: t.attributeName, color: "#5c6166" },
        ],
      });

    return myTheme;
}

export const getLanguageSyntax = (language: string) : any => {
  switch (language) {
    case "Python":
      return python();
    case "C++":
      return cpp();
    case "HTML":
      return html();
    case "Java":
      return java();
    case "Json":
      return json();
    default:
      return undefined;
  }
};
