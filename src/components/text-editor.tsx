import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from "@codemirror/theme-one-dark";
import { markdown } from "@codemirror/lang-markdown";
import { EditorView } from "@codemirror/view";
import { useMediaQuery } from "usehooks-ts";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  isEditable: boolean;
}

export default function TextEditor({
  value,
  onChange,
  isEditable,
}: TextEditorProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const editorTheme = EditorView.theme({
    "&": {
      borderRadius: "2px",
      borderColor: "#252525",
      borderWidth: "1px",
    },
    ".cm-content": {
      backgroundColor: "#252525",
      borderRadius: "2px",
      color: "#fff",
      fontSize: "15px",
      lineHeight: "1.6",
      padding: "8px",
      fontFamily: "SF Mono, Segoe UI, monospace",
    },
  });

  return (
    <CodeMirror
      value={value}
      onChange={onChange}
      editable={isEditable}
      theme={oneDark}
      height={isDesktop ? "85vh" : "80vh"}
      className="w-90 sm:w-full mx-auto"
      placeholder="Your text goes here..."
      aria-placeholder="Your text goes here..."
      extensions={[
        markdown(),
        EditorView.lineWrapping, // Removes horizontal scrolling
        editorTheme,
      ]}
      basicSetup={{
        lineNumbers: false, // Toggle line numbers
        foldGutter: false,
        highlightActiveLine: false, // Highlight active line
        searchKeymap: true, // cmd + f or ctrl + f
        highlightActiveLineGutter: false,
        history: true,
        drawSelection: false, // Text selection
        dropCursor: false,
        allowMultipleSelections: true,
        indentOnInput: false,
        bracketMatching: false,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: false,
        highlightSelectionMatches: true,
      }}
    />
  );
}
