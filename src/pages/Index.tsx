import { useState, useEffect, useCallback } from "react";
import { Play, Trash2, MessageSquare, Code2, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import CodeEditor from "@/components/CodeEditor";
import LanguageSelector from "@/components/LanguageSelector";
import OutputPanel from "@/components/OutputPanel";
import AIChatPanel from "@/components/AIChatPanel";
import { useCodeExecution } from "@/hooks/useCodeExecution";
import { codeTemplates } from "@/lib/codeTemplates";

const Index = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(codeTemplates.python);
  const [showChat, setShowChat] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const { toast } = useToast();

  const { executeCode, clearOutput, isRunning, output, error, executionTime } =
    useCodeExecution();

  // Update code template when language changes
  useEffect(() => {
    setCode(codeTemplates[language] || "// Start coding here...");
    clearOutput();
  }, [language, clearOutput]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRunCode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [code, language]);

  const handleRunCode = useCallback(() => {
    if (isRunning) return;
    toast({
      title: "Executing code...",
      description: `Running ${language} code`,
    });
    executeCode(code, language);
  }, [code, language, executeCode, isRunning, toast]);

  const handleClearCode = () => {
    setCode("");
    clearOutput();
    toast({
      title: "Cleared",
      description: "Code and output cleared",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
                <Code2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">CodeForge</h1>
                <p className="text-[10px] text-muted-foreground -mt-0.5">
                  Online Compiler
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <LanguageSelector value={language} onChange={setLanguage} />

              <div className="h-6 w-px bg-border mx-1" />

              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearCode}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>

              <Button
                onClick={handleRunCode}
                disabled={isRunning}
                size="sm"
                className="bg-success hover:bg-success/90 text-success-foreground glow-success"
              >
                {isRunning ? (
                  <Zap className="w-4 h-4 mr-1 animate-pulse" />
                ) : (
                  <Play className="w-4 h-4 mr-1" />
                )}
                Run
              </Button>

              <Button
                variant={showChat ? "default" : "outline"}
                size="sm"
                onClick={() => setShowChat(!showChat)}
                className={showChat ? "bg-primary" : ""}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                AI Chat
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4">
        <div
          className={`grid gap-4 h-[calc(100vh-8rem)] transition-all duration-300 ${
            showChat
              ? isChatExpanded
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {/* Code Editor Panel */}
          <div
            className={`flex flex-col gap-4 ${
              showChat && !isChatExpanded ? "md:col-span-2" : ""
            }`}
          >
            <div className="flex-1 min-h-0">
              <CodeEditor code={code} onChange={setCode} language={language} />
            </div>
          </div>

          {/* Output Panel - Hidden when chat is expanded */}
          {!(showChat && isChatExpanded) && (
            <div className="min-h-0">
              <OutputPanel
                output={output}
                error={error}
                isRunning={isRunning}
                executionTime={executionTime}
              />
            </div>
          )}

          {/* AI Chat Panel */}
          {showChat && (
            <div
              className={`min-h-0 ${
                isChatExpanded ? "md:col-span-1" : ""
              }`}
            >
              <AIChatPanel
                code={code}
                language={language}
                isExpanded={isChatExpanded}
                onToggleExpand={() => setIsChatExpanded(!isChatExpanded)}
                onClose={() => {
                  setShowChat(false);
                  setIsChatExpanded(false);
                }}
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-2 px-4 bg-card/50">
        <div className="container mx-auto flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            <span>Ctrl+Enter to run</span>
            <span>•</span>
            <span>13 languages supported</span>
          </div>
          <div>
            Powered by <span className="text-primary">Piston API</span> &{" "}
            <span className="text-primary">Gemini AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
