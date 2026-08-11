import { lazy, Suspense } from "react";
import { ClientOnly } from "@tanstack/react-router";

const Monaco = lazy(async () => {
  const mod = await import("@monaco-editor/react");
  return { default: mod.default };
});

function Fallback({ value }: { value: string }) {
  return (
    <pre className="h-full overflow-auto bg-panel p-4 font-mono text-xs leading-relaxed text-muted-foreground scroll-slim">
      {value}
    </pre>
  );
}

export function CodeEditor({
  language,
  value,
  onChange,
}: {
  language: string;
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <ClientOnly fallback={<Fallback value={value} />}>
      <Suspense fallback={<Fallback value={value} />}>
        <Monaco
          height="100%"
          theme="vs-dark"
          language={language}
          value={value}
          onChange={(next) => onChange(next ?? "")}
          loading={<Fallback value={value} />}
          options={{
            fontFamily:
              '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace',
            fontSize: 13,
            lineHeight: 20,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            renderLineHighlight: "gutter",
            padding: { top: 12, bottom: 12 },
            tabSize: 2,
            automaticLayout: true,
          }}
        />
      </Suspense>
    </ClientOnly>
  );
}
