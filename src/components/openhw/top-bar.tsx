import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopBar() {
  return (
    <header className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-zinc-800 h-14 shrink-0">
      <div className="flex items-center gap-4">
        <h1 className="font-bold text-lg text-emerald-400 tracking-tight">OpenHW</h1>
        <select className="bg-zinc-900 border border-zinc-700 text-sm rounded-md px-3 py-1 text-zinc-300 focus:outline-none focus:border-emerald-500">
          <option>ESP32-S3 WROOM</option>
          <option>Arduino UNO R3</option>
          <option>Raspberry Pi 5</option>
          <option>Jetson Orin Nano</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" className="border-zinc-700 bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
          Share
        </Button>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
          Save Project
        </Button>
        <Avatar className="h-8 w-8 ml-2 border border-zinc-700">
          <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
          <AvatarFallback>ME</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}

// Explicit default export to satisfy Vite & TanStack Router
export default TopBar;
