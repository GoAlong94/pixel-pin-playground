import { useState } from "react";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import type { Part } from "@/lib/parts";

const template = `void part_init(pin_t *pins, uint8_t n) {
  // set up registers / state here
}

uint16_t part_tick(uint64_t t_ns) {
  return 0;
}`;

export function CreatePartDialog({
  isPublic,
  onCreate,
}: {
  isPublic: boolean;
  onCreate: (part: Part) => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [pins, setPins] = useState("8");
  const [logic, setLogic] = useState(template);
  const [publish, setPublish] = useState(isPublic);

  const submit = () => {
    if (!name.trim()) return;
    onCreate({
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: "Sensors",
      pins: Number(pins) || 0,
      description: "Custom part · C behavior model",
      color: "var(--color-chart-4)",
      width: 130,
      height: 90,
      custom: true,
      isPublic: publish,
    });
    setName("");
    setPins("8");
    setLogic(template);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-9 w-full gap-1.5 text-xs font-semibold">
          <Plus className="h-4 w-4" /> Create Custom Part
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg border-border bg-panel">
        <DialogHeader>
          <DialogTitle className="font-mono text-base">New custom part</DialogTitle>
          <DialogDescription className="text-xs">
            Define the footprint and the C/C++ behavior model compiled into the
            simulator.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_120px]">
            <div className="grid min-w-0 gap-1.5">
              <Label htmlFor="part-name" className="text-xs">
                Part Name
              </Label>
              <Input
                id="part-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. BME680 Air Sensor"
                className="h-9 bg-background font-mono text-xs"
              />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="pin-count" className="text-xs">
                Pin Count
              </Label>
              <Input
                id="pin-count"
                type="number"
                min={1}
                value={pins}
                onChange={(e) => setPins(e.target.value)}
                className="h-9 bg-background font-mono text-xs"
              />
            </div>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="logic" className="text-xs">
              Define C/C++ Behavior Logic
            </Label>
            <Textarea
              id="logic"
              value={logic}
              onChange={(e) => setLogic(e.target.value)}
              rows={9}
              spellCheck={false}
              className="resize-none bg-background font-mono text-[11px] leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2">
            <div className="min-w-0">
              <p className="text-xs font-medium">
                {publish ? "Public part" : "Private part"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {publish
                  ? "Listed in the community registry"
                  : "Visible only in your workspace"}
              </p>
            </div>
            <Switch checked={publish} onCheckedChange={setPublish} />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={submit} className="font-semibold">
            Compile &amp; Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
