import { CircuitBoard, Save, Share2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { platforms } from "@/lib/parts";

export function TopBar({
  platform,
  onPlatformChange,
  onSave,
  onShare,
}: {
  platform: string;
  onPlatformChange: (id: string) => void;
  onSave: () => void;
  onShare: () => void;
}) {
  return (
    <header className="grid h-12 shrink-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-panel px-3 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
      <div className="flex min-w-0 items-center gap-2">
        <CircuitBoard className="h-5 w-5 shrink-0 text-primary" />
        <span className="truncate font-mono text-sm font-bold tracking-tight">
          Open<span className="text-primary">HW</span>
        </span>
        <span className="hidden truncate font-mono text-[10px] text-muted-foreground md:inline">
          / thermal-node-v2
        </span>
      </div>

      <div className="order-last col-span-2 sm:order-none sm:col-span-1">
        <Select value={platform} onValueChange={onPlatformChange}>
          <SelectTrigger className="h-8 w-full min-w-0 border-border bg-background font-mono text-xs sm:w-56">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-panel">
            {platforms.map((p) => (
              <SelectItem key={p.id} value={p.id} className="font-mono text-xs">
                {p.name}
                <span className="ml-2 text-muted-foreground">{p.mcu}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex shrink-0 items-center justify-end gap-1.5">
        <Button
          size="sm"
          variant="ghost"
          onClick={onSave}
          className="h-8 gap-1.5 px-2 text-xs"
        >
          <Save className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Save Project</span>
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onShare}
          className="h-8 gap-1.5 px-2 text-xs"
        >
          <Share2 className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <button className="flex items-center gap-1 rounded-full pl-0.5">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarFallback className="bg-surface font-mono text-[10px]">
              HK
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-3 w-3 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
