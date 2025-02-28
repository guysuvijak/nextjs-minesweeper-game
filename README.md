![Project Banner](/public/metadata/readme-1.webp)
# Minesweeper – Old school game with Next.JS
A simple implementation of the classic Minesweeper game built with Next.js. This project showcases the use of React components and modern front-end development techniques. Players can enjoy the Minesweeper game experience directly in their browser, with a clean and responsive UI.

![Project Banner](/public/metadata/readme-2.webp)
![Project Banner](/public/metadata/readme-3.webp)
![Project Banner](/public/metadata/readme-4.webp)

## 📌 Project Overview
Minesweeper is a web-based implementation of the classic puzzle game, built with Next.js 15. It features modern UI elements, customizable settings, and responsive design. Players can enjoy the classic Minesweeper experience with added features like custom themes, multiple languages, and various visual customization options.

![Project Banner](/public/metadata/readme-9.webp)

## ⚡ Key Points to Know
- 🎮 **Classic Gameplay** - Traditional Minesweeper mechanics with modern features
- 🌙 **Dark/Light Mode** - Full theme support with automatic system detection
- 🌍 **Multi-Language** - Supports English, Thai, Japanese, Vietnamese, and Chinese (can add more)
- 📱 **Responsive Design** - Playable on all devices from mobile to desktop
- 🎨 **Customizable UI** - Various options for icons, numbers, and game elements (can add more)
- 💾 **No Backend** - Client-side only with state management

## 🔥 Features
- 🎯 **Multiple Difficulty Levels** - Easy (9x9), Medium (16x16) and Hard (16x30)
- 🎨 **Customizable Elements** (can add more)
  - Different flag icons (Default, Pyramid, Radar, Sparkles, Sigma)
  - Various mine icons (Bomb, Skull, Fire, Flame, Ghost)
  - Multiple number styles (Default, Roman, Thai, ABC, Question)
- 🌍 **Language Support** - Available in multiple languages (can add more)
- 🎨 **Theme Options** - Dark and light mode with system preference detection
- 📊 **Score System** - Time-based scoring with difficulty multipliers
- 📱 **Mobile Support** - Touch-friendly interface with flag mode toggle

## 🛠️ Tech Stack
- <img src="https://avatars.githubusercontent.com/u/126103961" title="Next JS" alt="nextjs" width="20" height="20"/> Next.js 15 – Framework for static site generation.
- <img src="https://avatars.githubusercontent.com/u/67109815" title="Tailwind CSS" alt="tailwindcss" width="20" height="20"/> TailwindCSS 4 – Utility-first CSS framework for styling.
- <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" title="TypeScript" alt="typscript" width="20" height="20"/> TypeScript – Strongly typed JavaScript for better maintainability.
- <img src="https://avatars.githubusercontent.com/u/139895814" title="Shadcn/ui" alt="shadcn-ui" width="20" height="20"/> shadcn/ui – Reusable UI components
- <img src="https://avatars.githubusercontent.com/u/166878038" title="Magic UI" alt="magic-ui" width="20" height="20"/> Magic UI – Reusable UI components
- <img src="https://avatars.githubusercontent.com/u/66879934" title="Lucide Icons" alt="lucide-icons" width="20" height="20"/> Lucide Icons – Modern icon set
- <img src="https://avatars.githubusercontent.com/u/34928425" title="Next-Themes" alt="next-themes" width="20" height="20"/> next-themes – Theme management

![Project Banner](/public/metadata/readme-8.webp)

## 🚀 Live Demo
Try it here: [Minesweeper](https://nextjs-minesweeper-game.vercel.app)

![Project Banner](/public/metadata/readme-5.webp)
![Project Banner](/public/metadata/readme-6.webp)
![Project Banner](/public/metadata/readme-7.webp)

## 📂 Installation & Setup

To run this project locally, follow these steps:

### **1. Clone the repository**
```bash
git clone https://github.com/guysuvijak/nextjs-minesweeper-game.git
```
```bash
cd nextjs-minesweeper-game
```
### **2. Install dependencies**
```bash
npm install
or
bun install
or
pnpm install
```
### **3. Start the development server**
```bash
npm run dev
or
bun run dev
or
pnpm run dev
```
### **4. The app will be available**
[http://localhost:3000](http://localhost:3000)


## 🗺️ Project Structure
```bash
nextjs-minesweeper-game/
├── public/              # Static assets
│   ├── cursor/          # Static Cursor Image
│   ├── icon/            # Website Icon
│   ├── metadata/        # Static Metadata & README Image
│   └── manifest.json    # Config Metadata (PWA)
└── src/
    ├── app/             # layout & page Next.JS
    │   └── page.tsx     # Main Page
    ├── components/      # React components
    │   ├── magicui/     # UI from Magic-UI
    │   ├── ui/          # UI from shadcn/ui
    │   ├── CustomDock.tsx      # Menu Dock in Mainmenu
    │   ├── GameResultModal.tsx # Modal Result in Game Screen
    │   ├── MainMenu.tsx        # Mainmenu Screen
    │   ├── Minesweeper.tsx     # Game Screen
    │   ├── SettingsModal.tsx   # Modal Settings in Mainmenu
    │   └── Timer.tsx           # Timer in Game Screen
    ├── configs/         # Configs File (Edit Here)
    ├── hooks/           # React Custom Hooks
    ├── lib/             # Auto Create from Library
    ├── locales/         # Language Files
    └── types/           # TypeScript File
```


## 📄 Modifying the Website
Since this is a static website, all modifications must be made directly within the project files. Here’s where you can edit specific parts of the site:
```bash
⚙️ Game Configuration
📍 File: src/configs/game.tsx
Add or modify game settings like difficulty levels, scoring, and colors.
```
```bash
🎨 UI Settings
📍 File: src/configs/settings.ts
Configure available options for icons, themes, and number styles.
```
```bash
🌍 Language Files
📍 Folder: src/locales/
📍 File: src/configs/language.ts
Add or modify translations for different languages.
```
```bash
🖼️ Custom Cursors
📍 Folder: public/cursor/
Add or modify custom cursor images.
```
```bash
⚙️ Types Definition
📍 File: src/types/index.ts
Modify TypeScript types and interfaces.
```
```bash
⚙️ Website Configuration
📍 Files:
src/configs/metadata.ts – Modify general layout and metadata settings.
public/manifest.json – Update website metadata for PWA settings.
```

## 📜 License
This project is open-source under the MIT License.
Let me know if you need any modifications! 🚀

## 🙏 Acknowledgments
Thank you for your interest in Minesweeper from me! Your support means a lot. :heart: </br>
⭐ If you like this project, please consider giving it a star on GitHub to show your support and encouragement! 🚀