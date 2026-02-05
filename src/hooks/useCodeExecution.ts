import { useState, useCallback } from "react";

interface ExecutionResult {
  output: string;
  error: string;
  executionTime?: number;
}

// Piston API language mapping
const pistonLanguages: Record<string, { language: string; version: string }> = {
  python: { language: "python", version: "3.10.0" },
  javascript: { language: "javascript", version: "18.15.0" },
  typescript: { language: "typescript", version: "5.0.3" },
  java: { language: "java", version: "15.0.2" },
  cpp: { language: "c++", version: "10.2.0" },
  c: { language: "c", version: "10.2.0" },
  csharp: { language: "csharp", version: "6.12.0" },
  go: { language: "go", version: "1.16.2" },
  rust: { language: "rust", version: "1.68.2" },
  ruby: { language: "ruby", version: "3.0.1" },
  php: { language: "php", version: "8.2.3" },
  swift: { language: "swift", version: "5.3.3" },
  kotlin: { language: "kotlin", version: "1.8.20" },
};

export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<ExecutionResult>({
    output: "",
    error: "",
  });

  const executeCode = useCallback(async (code: string, language: string) => {
    if (!code.trim()) {
      setResult({ output: "", error: "No code to execute" });
      return;
    }

    const langConfig = pistonLanguages[language];
    if (!langConfig) {
      setResult({ output: "", error: `Language "${language}" is not supported` });
      return;
    }

    setIsRunning(true);
    setResult({ output: "", error: "" });

    const startTime = performance.now();

    try {
      const response = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: langConfig.language,
          version: langConfig.version,
          files: [
            {
              content: code,
            },
          ],
          stdin: "",
          args: [],
          compile_timeout: 10000,
          run_timeout: 5000,
        }),
      });

      const endTime = performance.now();
      const executionTime = Math.round(endTime - startTime);

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.compile?.stderr) {
        setResult({
          output: "",
          error: data.compile.stderr,
          executionTime,
        });
      } else if (data.run?.stderr) {
        setResult({
          output: data.run.stdout || "",
          error: data.run.stderr,
          executionTime,
        });
      } else {
        setResult({
          output: data.run?.stdout || "Program executed successfully (no output)",
          error: "",
          executionTime,
        });
      }
    } catch (error) {
      const endTime = performance.now();
      const executionTime = Math.round(endTime - startTime);
      console.error("Execution error:", error);
      setResult({
        output: "",
        error: error instanceof Error ? error.message : "Failed to execute code",
        executionTime,
      });
    } finally {
      setIsRunning(false);
    }
  }, []);

  const clearOutput = useCallback(() => {
    setResult({ output: "", error: "" });
  }, []);

  return {
    executeCode,
    clearOutput,
    isRunning,
    output: result.output,
    error: result.error,
    executionTime: result.executionTime,
  };
};
