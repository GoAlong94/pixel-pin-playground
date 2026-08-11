# Hardware Playground

Project Title: OpenHW - Next-Gen Hardware Simulator & IDE

Role: Act as an expert frontend engineer specializing in Next.js, Tailwind CSS, and interactive canvas UIs.

Core Objective: Build a responsive, dark-mode MVP for a web-based hardware simulator and IDE. The platform allows users to write C/C++ code, simulate microcontrollers (Arduino, ESP32, Raspberry Pi, Jetson), and drag-and-drop hardware components.

UI/UX Layout (The 3-Pane Architecture): Reference the general dark-theme aesthetic of a standard web IDE, but implement a 3-pane resizable layout (using react-resizable-panels):

Left Pane (Code Editor): Integrate the Monaco Editor (VS Code web editor) configured for C/C++ syntax highlighting. Include tabs at the top for switching between main.cpp, config.json, and custom_chip.c.

Center Pane (Visual Simulator Canvas): An interactive 2D grid canvas (using React Flow or HTML5 Canvas). It should allow drag-and-drop placement of microcontrollers, breadboards, and sensors. Include a top toolbar with "Play/Simulate", "Pause", and "Reset" buttons.

Right Pane (Component Library & Manager): A scrollable sidebar with accordion menus containing parts.

Include categories: Microcontrollers, Sensors, Displays, Power.

Include a prominent primary button: "+ Create Custom Part".

Include secondary buttons: "Import STL/CAD" and "Write C Logic".

Include a toggle switch for "Public / Private" visibility for user-created parts.

Top Navigation Bar:

Left: Logo ("OpenHW").

Middle: A dropdown to select the target platform (Arduino UNO, ESP32-S3, Raspberry Pi 5, Jetson Orin Nano).

Right: "Save Project", "Share", and a User Avatar profile icon.

Tech Stack & Database Integration:

Framework: Next.js (App Router) with React.

Styling: Tailwind CSS + Shadcn UI components for buttons, dropdowns, dialogs, and sliders.

Icons: Lucide React.

Database/Backend Placeholder: Structure the data fetching logic to easily connect to Supabase later. Create mock JSON arrays for the component library so I can see how parts load into the right pane.

Specific Interactions to Mock Up:

When a user clicks "+ Create Custom Part" in the Right Pane, open a Shadcn Modal/Dialog that asks for a "Part Name", "Pin Count", and has a text area labeled "Define C/C++ Behavior Logic".

Ensure the three panes can be dragged to resize their widths seamlessly.

Design System:

Strict dark mode (backgrounds in shades of #1e1e1e to #0d1117).

Accents in a vibrant tech color (e.g., bright blue or emerald green for active states and the 'Run Simulation' button).

Keep the UI dense but clean, highly tailored for software engineers and hardware hackers.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3cd71a30-12ba-45f2-a89c-544f42657850).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
