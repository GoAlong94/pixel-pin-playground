import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CreatePartDialog({ children }: { children: React.ReactNode }) {
  const [partName, setPartName] = useState("");
  const [pinCount, setPinCount] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-[#161b22] text-zinc-100 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-emerald-400">Create Custom Hardware Part</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Define a new component. Write the C/C++ simulation logic that dictates how its pins behave in the simulator.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-zinc-300">Part Name</Label>
            <Input 
              id="name" 
              placeholder="e.g. INMP441 Mic" 
              value={partName} 
              onChange={(e) => setPartName(e.target.value)} 
              className="col-span-3 bg-[#0d1117] border-zinc-700 text-zinc-200" 
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="pins" className="text-right text-zinc-300">Pin Names (CSV)</Label>
            <Input 
              id="pins" 
              placeholder="e.g. VDD, GND, SCK, WS, SD" 
              value={pinCount} 
              onChange={(e) => setPinCount(e.target.value)} 
              className="col-span-3 bg-[#0d1117] border-zinc-700 text-zinc-200" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="logic" className="text-zinc-300">C/C++ Simulation Logic</Label>
            <Textarea 
              id="logic" 
              placeholder="void chip_init() { ... }" 
              className="h-48 font-mono text-sm bg-[#0d1117] border-zinc-700 text-zinc-200 placeholder:text-zinc-600"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Save Custom Part
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
