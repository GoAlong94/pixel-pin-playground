import { useState } from "react";
import { FileCode2, FileJson, Terminal, X } from "lucide-react";
import { CodeEditor } from "./code-editor";
import { cn } from "@/lib/utils";

const fileMeta: Record<string, { language: string; icon: typeof FileCode2 }> = {
  "main.cpp": { language: "cpp", icon: FileCode2 },
  "config.json": { language: "json", icon: FileJson },
  "custom_chip.c": { language: "c", icon: FileCode2 },
};

export function EditorPane({
  files,
  onFileChange,
  logs,
}: {
  files: Record<string, string>;
  onFileChange: (name: string, next: string) => void;
  logs: string[];
}) {
  const names = Object.keys(files);
  const [active, setActive] = useState(names[0]);
  const meta = fileMeta[active] ?? { language: "cpp", icon: FileCode2 };

  return (
    <div className="flex h-full min-w-0 flex-col bg-panel">
      <div className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-border bg-background scroll-slim">
        {names.map((name) => {
          const Icon = (fileMeta[name] ?? fileMeta["main.cpp"]).icon;
          const isActive = name === active;
          return (
            <button
              key={name}
              onClick={() => setActive(name)}
              className={cn(
                "group flex shrink-0 items-center gap-2 border-r border-border px-3 font-mono text-xs transition-colors",
                isActive
                  ? "border-t-2 border-t-primary bg-panel text-foreground"
                  : "text-muted-foreground hover:bg-panel/60 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary/70" />
              <span>{name}</span>
              <X className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-60" />
            </button>
          );
        })}
      </div>

      <div className="min-h-0 flex-1">
        <CodeEditor
          key={active}
          language={meta.language}
          value={files[active]}
          onChange={(next) => onFileChange(active, next)}
        />
      </div>

      <div className="flex h-40 shrink-0 flex-col border-t border-border bg-background">
        <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
            Serial Monitor
          </span>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-3 font-mono text-[11px] leading-relaxed scroll-slim">
          {logs.length === 0 ? (
            <p className="text-muted-foreground">
              Idle — press Simulate to build and flash.
            </p>
          ) : (
            logs.map((line, i) => (
              <p key={i} className="text-foreground/80">
                <span className="text-primary">›</span> {line}
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
