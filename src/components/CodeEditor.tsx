import Editor from "@monaco-editor/react";
import { useRef } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  language: string;
}

const languageMap: Record<string, string> = {
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
  java: "java",
  cpp: "cpp",
  c: "c",
  csharp: "csharp",
  go: "go",
  rust: "rust",
  ruby: "ruby",
  php: "php",
  swift: "swift",
  kotlin: "kotlin",
};

const CodeEditor = ({ code, onChange, language }: CodeEditorProps) => {
  const editorRef = useRef<any>(null);

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="h-full w-full rounded-lg overflow-hidden border border-border bg-editor-bg">
      <Editor
        height="100%"
        language={languageMap[language] || "plaintext"}
        value={code}
        onChange={(value) => onChange(value || "")}
        onMount={handleEditorMount}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineNumbers: "on",
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          wordWrap: "on",
          tabSize: 2,
          cursorBlinking: "smooth",
          cursorSmoothCaretAnimation: "on",
          smoothScrolling: true,
          renderLineHighlight: "all",
          bracketPairColorization: { enabled: true },
        }}
      />
    </div>
  );
};

export default CodeEditor;
