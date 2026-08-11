import { useState } from "react";

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState("main.cpp");
  
  // State to hold code across our tabs
  const [files, setFiles] = useState({
    "main.cpp": `#include <Arduino.h>\n\nTaskHandle_t DriveTask;\n\nvoid driveLogic(void * pvParameters) {\n  for(;;) {\n    // 4-Wheel chassis control logic\n    delay(50);\n  }\n}\n\nvoid setup() {\n  Serial.begin(115200);\n  Serial.println("System Booting...");\n  \n  // Core 1: Execute Drive Logic\n  xTaskCreatePinnedToCore(\n    driveLogic, "DriveTask", 10000, NULL, 1, &DriveTask, 1\n  );\n}\n\nvoid loop() {\n  delay(10);\n}`,
    "config.json": `{\n  "version": 1,\n  "author": "OpenHW User",\n  "board": "esp32-s3-devkitc-1"\n}`,
    "custom_chip.c": `void chip_init() {\n  // Define custom I2S or PWM logic here\n}`
  });

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFiles({ ...files, [activeTab]: e.target.value });
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-r border-zinc-800">
      {/* Editor Tabs */}
      <div className="flex bg-[#2d2d2d] overflow-x-auto no-scrollbar shrink-0">
        {Object.keys(files).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm whitespace-nowrap border-r border-zinc-700 focus:outline-none ${
              activeTab === tab
                ? "bg-[#1e1e1e] text-emerald-400 border-t-2 border-t-emerald-400"
                : "text-zinc-400 hover:bg-[#3d3d3d]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Editable Code Area */}
      <div className="flex-1 p-0 overflow-hidden relative">
        <textarea
          value={files[activeTab as keyof typeof files]}
          onChange={handleCodeChange}
          spellCheck="false"
          className="w-full h-full p-4 font-mono text-sm text-zinc-300 bg-[#1e1e1e] border-none resize-none focus:outline-none focus:ring-0 leading-relaxed"
          style={{ tabSize: 2 }}
        />
      </div>
    </div>
  );
}
