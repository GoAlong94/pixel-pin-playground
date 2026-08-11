import { useRef, useState } from "react";
import { Pause, Play, RotateCcw, Trash2, ZoomIn, ZoomOut, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { Part } from "@/lib/parts";

export type PlacedPart = {
  uid: string;
  part: Part;
  x: number;
  y: number;
};

type SimState = "idle" | "running" | "paused";

export function CanvasPane({
  placed,
  setPlaced,
  simState,
  onSim,
}: {
  placed: PlacedPart[];
  setPlaced: React.Dispatch<React.SetStateAction<PlacedPart[]>>;
  simState: SimState;
  onSim: (next: SimState) => void;
}) {
  const areaRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ uid: string; dx: number; dy: number } | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);

  const snap = (v: number) => Math.round(v / 12) * 12;

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const raw = e.dataTransfer.getData("application/openhw-part");
    if (!raw) return;
    const part = JSON.parse(raw) as Part;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPlaced((prev) => [
      ...prev,
      {
        uid: `${part.id}-${Date.now()}`,
        part,
        x: snap(e.clientX - rect.left - part.width / 2),
        y: snap(e.clientY - rect.top - part.height / 2),
      },
    ]);
  };

  const startMove = (e: React.PointerEvent, item: PlacedPart) => {
    e.preventDefault();
    setSelected(item.uid);
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    dragRef.current = {
      uid: item.uid,
      dx: e.clientX - rect.left - item.x,
      dy: e.clientY - rect.top - item.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onMove = (e: React.PointerEvent) => {
    const drag = dragRef.current;
    const rect = areaRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    setPlaced((prev) =>
      prev.map((p) =>
        p.uid === drag.uid
          ? {
              ...p,
              x: snap(Math.max(0, e.clientX - rect.left - drag.dx)),
              y: snap(Math.max(0, e.clientY - rect.top - drag.dy)),
            }
          : p,
      ),
    );
  };

  return (
    <div className="flex h-full min-w-0 flex-col bg-background">
      <div className="grid h-11 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-panel px-3">
        <div className="flex min-w-0 items-center gap-1.5">
          <Button
            size="sm"
            variant={simState === "running" ? "secondary" : "default"}
            onClick={() => onSim("running")}
            className="h-7 gap-1.5 px-2.5 text-xs font-semibold"
          >
            <Play className="h-3.5 w-3.5" />
            {simState === "running" ? "Simulating" : "Simulate"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSim("paused")}
            className="h-7 gap-1.5 px-2.5 text-xs"
          >
            <Pause className="h-3.5 w-3.5" /> Pause
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onSim("idle")}
            className="h-7 gap-1.5 px-2.5 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </Button>
          <span
            className={cn(
              "ml-2 hidden items-center gap-1.5 truncate font-mono text-[11px] sm:flex",
              simState === "running" ? "text-primary" : "text-muted-foreground",
            )}
          >
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                simState === "running"
                  ? "animate-pulse bg-primary"
                  : simState === "paused"
                    ? "bg-chart-3"
                    : "bg-muted-foreground",
              )}
            />
            {simState === "running"
              ? "clk 240MHz · 1.00x"
              : simState === "paused"
                ? "halted"
                : "stopped"}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ZoomOut className="h-3.5 w-3.5 text-muted-foreground" />
          <Slider
            value={[zoom]}
            min={50}
            max={150}
            step={5}
            onValueChange={(v) => setZoom(v[0] ?? 100)}
            className="w-24"
          />
          <ZoomIn className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="w-9 font-mono text-[11px] text-muted-foreground">
            {zoom}%
          </span>
          {selected && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-destructive"
              onClick={() => {
                setPlaced((prev) => prev.filter((p) => p.uid !== selected));
                setSelected(null);
              }}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          )}
        </div>
      </div>

      <div
        ref={areaRef}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        onPointerMove={onMove}
        onPointerUp={() => (dragRef.current = null)}
        onClick={(e) => e.target === e.currentTarget && setSelected(null)}
        className="relative min-h-0 flex-1 overflow-hidden grid-canvas"
      >
        <div
          className="absolute inset-0 origin-top-left"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {placed.map((item) => (
            <div
              key={item.uid}
              onPointerDown={(e) => startMove(e, item)}
              style={{
                left: item.x,
                top: item.y,
                width: item.part.width,
                height: item.part.height,
                borderColor: item.part.color,
              }}
              className={cn(
                "absolute cursor-grab touch-none rounded-md border-2 bg-panel/95 p-2 shadow-lg transition-shadow select-none active:cursor-grabbing",
                selected === item.uid && "ring-2 ring-primary ring-offset-2 ring-offset-background",
              )}
            >
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 shrink-0" style={{ color: item.part.color }} />
                <span className="truncate font-mono text-[11px] font-semibold">
                  {item.part.name}
                </span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                {item.part.pins} pins
              </p>
              <div className="absolute inset-x-2 bottom-1 flex justify-between">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1.5 w-1.5 rounded-sm bg-muted-foreground/50",
                      simState === "running" && i % 3 === 0 && "animate-pulse bg-primary",
                    )}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {placed.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="max-w-xs text-center font-mono text-xs text-muted-foreground">
              Drag parts from the library onto the grid to wire up your board.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
