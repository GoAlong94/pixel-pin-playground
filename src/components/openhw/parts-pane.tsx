import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Upload, Code2 } from "lucide-react";
import CreatePartDialog from "./create-part-dialog";

const partsDatabase = {
  "Microcontrollers": [
    "ESP32-S3 WROOM N16R8",
    "ESP32 38 Pin Dev Board"
  ],
  "Sensors": [
    "HC-SR04 Ultrasonic Sensor",
    "GY-521 MPU-6050",
    "INMP441 Digital Mic"
  ],
  "Displays & Audio": [
    "1.8 inch SPI TFT LCD ST7735",
    "MAX98357A I2S 3W Amp",
    "PAM8403 Mini 2 Channel Amp",
    "Mini 3Watt Speaker 4ohm"
  ],
  "Motors & Power": [
    "L298 Motor Driver",
    "LM2596 Buck Converter",
    "4-Wheel Smart Car Chassis",
    "18650 Battery Holder Case"
  ],
  "Passives & Hardware": [
    "Themisto 830 Point Breadboard",
    "SPST Round Rocker Switch",
    "10K Ohm Through Hole Resistor",
    "1000uF 25V Capacitor",
    "Dupont Jumper Wires"
  ]
};

export default function PartsPane() {
  return (
    <div className="flex flex-col h-full bg-[#161b22] border-l border-zinc-800">
      <div className="p-4 border-b border-zinc-800 space-y-3 shrink-0">
        <h2 className="font-semibold text-zinc-100">Components</h2>
        
        <CreatePartDialog>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8">
            <Plus className="mr-2 h-3 w-3" /> Create Custom Part
          </Button>
        </CreatePartDialog>

        <div className="flex gap-2">
          <Button variant="outline" className="w-1/2 bg-zinc-900 border-zinc-700 text-zinc-300 text-xs h-8">
            <Upload className="mr-2 h-3 w-3" /> CAD
          </Button>
          <Button variant="outline" className="w-1/2 bg-zinc-900 border-zinc-700 text-zinc-300 text-xs h-8">
            <Code2 className="mr-2 h-3 w-3" /> C Logic
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <Accordion type="multiple" defaultValue={["Microcontrollers"]} className="w-full">
          {Object.entries(partsDatabase).map(([category, items]) => (
            <AccordionItem key={category} value={category} className="border-b-zinc-800 border-b">
              <AccordionTrigger className="text-sm font-medium text-zinc-300 hover:text-white py-3 px-2">
                {category}
              </AccordionTrigger>
              <AccordionContent className="px-2 pb-3">
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div 
                      key={item} 
                      draggable
                      className="p-2 text-xs text-zinc-400 bg-zinc-900/50 border border-zinc-800/50 rounded cursor-grab hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
