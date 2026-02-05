import { Terminal, CheckCircle, XCircle, Clock, Loader2 } from "lucide-react";

interface OutputPanelProps {
  output: string;
  error: string;
  isRunning: boolean;
  executionTime?: number;
}

const OutputPanel = ({ output, error, isRunning, executionTime }: OutputPanelProps) => {
  const hasError = error.length > 0;
  const hasOutput = output.length > 0 || error.length > 0;

  return (
    <div className="h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-secondary/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          <span className="font-medium text-sm">Output</span>
        </div>
        <div className="flex items-center gap-2">
          {isRunning ? (
            <div className="flex items-center gap-1.5 text-warning">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span className="text-xs">Running...</span>
            </div>
          ) : hasOutput ? (
            <>
              {hasError ? (
                <div className="flex items-center gap-1.5 text-destructive">
                  <XCircle className="w-3.5 h-3.5" />
                  <span className="text-xs">Error</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-success">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span className="text-xs">Success</span>
                </div>
              )}
              {executionTime !== undefined && (
                <div className="flex items-center gap-1 text-muted-foreground ml-2">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{executionTime}ms</span>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>

      {/* Output Content */}
      <div className="flex-1 p-4 overflow-auto scrollbar-thin bg-code-surface">
        {isRunning ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="text-sm">Executing code...</span>
            </div>
          </div>
        ) : hasOutput ? (
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {error ? (
              <span className="text-destructive">{error}</span>
            ) : (
              <span className="text-foreground">{output}</span>
            )}
          </pre>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center">
              <Terminal className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Run your code to see output here</p>
              <p className="text-xs mt-1 opacity-70">Press Ctrl+Enter or click Run</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanel;
