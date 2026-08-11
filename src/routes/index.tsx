import { createFileRoute } from '@tanstack/react-router';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

// Import our 4 core UI components
import TopBar from "@/components/openhw/top-bar";
import CodeEditor from "@/components/openhw/code-editor";
import CanvasPane from "@/components/openhw/canvas-pane";
import PartsPane from "@/components/openhw/parts-pane";

// TanStack Router requires this specific export syntax to register the route
export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col h-screen w-full bg-[#0d1117] text-white overflow-hidden">
      {/* Top Navigation Bar */}
      <TopBar />
      
      {/* Main 3-Pane Workspace */}
      <div className="flex-1 h-full w-full">
        <ResizablePanelGroup direction="horizontal" className="h-full w-full">
          
          {/* Left Pane: Code Editor */}
          <ResizablePanel defaultSize={30} minSize={20} className="flex flex-col h-full">
            <CodeEditor />
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-zinc-800 border-zinc-700" />
          
          {/* Center Pane: Visual Canvas Simulator */}
          <ResizablePanel defaultSize={50} minSize={30} className="flex flex-col h-full z-0">
            <CanvasPane />
          </ResizablePanel>
          
          <ResizableHandle withHandle className="bg-zinc-800 border-zinc-700" />
          
          {/* Right Pane: Component Library */}
          <ResizablePanel defaultSize={20} minSize={15} className="flex flex-col h-full">
            <PartsPane />
          </ResizablePanel>
          
        </ResizablePanelGroup>
      </div>
    </div>
  );
}
