import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TopBar } from "@/components/openhw/top-bar";
import { EditorPane } from "@/components/openhw/editor-pane";
import { CanvasPane, type PlacedPart } from "@/components/openhw/canvas-pane";
import { PartsPane } from "@/components/openhw/parts-pane";
import { initialFiles, mockParts, platforms, type Part } from "@/lib/parts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OpenHW — Hardware Simulator & C/C++ IDE" },
      {
        name: "description",
        content:
          "Simulate Arduino, ESP32, Raspberry Pi and Jetson boards in the browser: Monaco C/C++ editor, drag-and-drop circuit canvas and custom part authoring.",
      },
      { property: "og:title", content: "OpenHW — Hardware Simulator & C/C++ IDE" },
      {
        property: "og:description",
        content:
          "A dark, dense web IDE for hardware hackers: write C/C++, drop in sensors and displays, and simulate your board instantly.",
      },
    ],
  }),
  component: Workbench,
});

function Workbench() {
  const [platform, setPlatform] = useState(platforms[1]!.id);
  const [files, setFiles] = useState(initialFiles);
  const [parts, setParts] = useState<Part[]>(mockParts);
  const [placed, setPlaced] = useState<PlacedPart[]>([]);
  const [isPublic, setIsPublic] = useState(false);
  const [simState, setSimState] = useState<"idle" | "running" | "paused">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const platformName = platforms.find((p) => p.id === platform)?.name ?? "";

  useEffect(() => {
    if (simState !== "running") return;
    const id = setInterval(() => {
      setLogs((prev) =>
        [...prev, `temp = ${(24 + Math.random() * 9).toFixed(2)} C`].slice(-80),
      );
    }, 600);
    return () => clearInterval(id);
  }, [simState]);

  const handleSim = (next: "idle" | "running" | "paused") => {
    setSimState(next);
    if (next === "running") {
      setLogs((prev) => [...prev, `build ok · flashing ${platformName}...`]);
    } else if (next === "paused") {
      setLogs((prev) => [...prev, "simulation halted"]);
    } else {
      setLogs([]);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <TopBar
        platform={platform}
        onPlatformChange={(id) => {
          setPlatform(id);
          toast.success(`Target set to ${platforms.find((p) => p.id === id)?.name}`);
        }}
        onSave={() => toast.success("Project saved to workspace")}
        onShare={() => toast.info("Share link copied to clipboard")}
      />

      <main className="min-h-0 flex-1">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={32} minSize={18}>
            <EditorPane
              files={files}
              onFileChange={(name, next) =>
                setFiles((prev) => ({ ...prev, [name]: next }))
              }
              logs={logs}
            />
          </ResizablePanel>
          <ResizableHandle className="w-px bg-border transition-colors hover:bg-primary" />
          <ResizablePanel defaultSize={45} minSize={25}>
            <CanvasPane
              placed={placed}
              setPlaced={setPlaced}
              simState={simState}
              onSim={handleSim}
            />
          </ResizablePanel>
          <ResizableHandle className="w-px bg-border transition-colors hover:bg-primary" />
          <ResizablePanel defaultSize={23} minSize={16}>
            <PartsPane
              parts={parts}
              isPublic={isPublic}
              onPublicChange={setIsPublic}
              onCreate={(part) => {
                setParts((prev) => [...prev, part]);
                toast.success(`${part.name} compiled and added`);
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
