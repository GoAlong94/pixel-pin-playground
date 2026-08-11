import { Boxes, Code2, Cpu, Gauge, MonitorSmartphone, Upload, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CreatePartDialog } from "./create-part-dialog";
import { partCategories, type Part, type PartCategory } from "@/lib/parts";

const categoryIcon: Record<PartCategory, typeof Cpu> = {
  Microcontrollers: Cpu,
  Sensors: Gauge,
  Displays: MonitorSmartphone,
  Power: Zap,
};

export function PartsPane({
  parts,
  isPublic,
  onPublicChange,
  onCreate,
}: {
  parts: Part[];
  isPublic: boolean;
  onPublicChange: (next: boolean) => void;
  onCreate: (part: Part) => void;
}) {
  return (
    <aside className="flex h-full min-w-0 flex-col bg-sidebar">
      <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-3">
        <Boxes className="h-4 w-4 shrink-0 text-primary" />
        <h2 className="truncate text-xs font-semibold tracking-widest uppercase">
          Component Library
        </h2>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto scroll-slim">
        <Accordion
          type="multiple"
          defaultValue={["Microcontrollers", "Sensors"]}
          className="px-2 py-1"
        >
          {partCategories.map((category) => {
            const Icon = categoryIcon[category];
            const items = parts.filter((p) => p.category === category);
            return (
              <AccordionItem key={category} value={category} className="border-border">
                <AccordionTrigger className="py-2.5 text-xs hover:no-underline">
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="truncate">{category}</span>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {items.length}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="grid gap-1.5">
                    {items.map((part) => (
                      <div
                        key={part.id}
                        draggable
                        onDragStart={(e) =>
                          e.dataTransfer.setData(
                            "application/openhw-part",
                            JSON.stringify(part),
                          )
                        }
                        className="cursor-grab rounded-md border border-border bg-surface/60 px-2.5 py-2 transition-colors hover:border-primary/60 hover:bg-surface active:cursor-grabbing"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-mono text-[11px] font-medium">
                            {part.name}
                          </span>
                          <Badge
                            variant="outline"
                            className="shrink-0 border-border font-mono text-[9px]"
                          >
                            {part.pins}p
                          </Badge>
                        </div>
                        <p className="mt-0.5 truncate text-[10px] text-muted-foreground">
                          {part.description}
                        </p>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <p className="px-1 py-2 text-[11px] text-muted-foreground">
                        No parts yet.
                      </p>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>

      <div className="shrink-0 space-y-2 border-t border-border p-3">
        <CreatePartDialog isPublic={isPublic} onCreate={onCreate} />
        <div className="grid grid-cols-2 gap-2">
          <Button variant="secondary" size="sm" className="h-8 gap-1.5 text-[11px]">
            <Upload className="h-3.5 w-3.5" /> Import STL
          </Button>
          <Button variant="secondary" size="sm" className="h-8 gap-1.5 text-[11px]">
            <Code2 className="h-3.5 w-3.5" /> Write C Logic
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-md border border-border bg-background px-2.5 py-2">
          <Label htmlFor="visibility" className="text-[11px] text-muted-foreground">
            {isPublic ? "Public" : "Private"} parts
          </Label>
          <Switch id="visibility" checked={isPublic} onCheckedChange={onPublicChange} />
        </div>
      </div>
    </aside>
  );
}
