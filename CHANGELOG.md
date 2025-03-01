# Minesweeper Changelog
All notable changes to this project will be documented in this file.

## 📍 [1.2.2] - 2025-03-01

### Fixed
- Fixed: Viewport (Lighthouse Accessibility score)
- Fixed: VersionGame color (Lighthouse Accessibility score)

## 📍 [1.2.1] - 2025-03-01

### Fixed
- Game logic: Calculate score
- Game system: When press restart button, not reset Flag placed.

## 📍 [1.2.0] - 2025-03-01
Version 1.2.0 adds a PWA system for offline mobile play and integrates Tauri for cross-platform export, allowing the game to run on all platforms (desktop, macOS, Android, iOS, Linux, and web).

Additionally, we have refined the game logic for a more polished experience and introduced a new sharing system.

### Added
- package: @tauri-apps/cli & next-pwa & @types/next-pwa
- script: tauri
- setup: tauri for cross-platform application
- setup: next-pwa
- added: Viewport (next)
- Mainmenu > Game Info > added link CHANGELOG.md
- setting: added menu change Flag icon color
- added: Flag country icon (Language setting)

### Changed
- move package to devDependencies: @next/bundle-analyzer & @tailwindcss/postcss & autoprefixer & next-themes & tailwind-merge & tailwindcss-animate
- NextThemeProvider changed defaultTheme "system" > "light"
- Refactor code: SettingsModal.tsx (reusable more / SelectField)
- next.config.ts for withPWA
- updated: Share game result clipboard > save image .png file
- updated: Game Result share image added board game.

### Fixed
- Fixed: Gamelogic when pressing Reset button, the time does not reset to 0.
- Fixed: Gamelogic does not remove the flag when opening a tile that has no surrounding mines but has a flag placed on it.
- MainMenu change import "version" to "pkg" for fixed issue Compiled.

## 📍 [1.1.0] - 2025-03-01
Here we would have the update steps for 1.1.0 for people to follow.

In this version, there are significant changes as we aimed to make it more developable and easier to maintain. We've revamped several systems to achieve consistency, with the main changes being the upgrade of TailwindCSS to version 4.0.9 and the implementation of Zustand for global state management instead of passing props across pages.

### Added
- file: .env.example & CHANGELOG.md
- package: @next/bundle-analyzer & @tailwindcss/postcss & autoprefixer & tailwindcss-animate & zustand
- file: /public/assets/not-found.webp
- Global State with zustand
### Changed
- setup: "next.config.ts" bundle-analyzer & images
- package: upgrade tailwindcss 3.4.1 > 4.0.9
- edit README.md (TailwindCSS version)
- refactor: local storage > global state managment with zustand
### Fixed
- postcss.config.mjs & tailwind.config.ts & global.css for TailwindCSS 4.0.9
- Fixed game logic after playing can continue playing for 1 turn.
- Fixed Theme issue.
 
## 📍 [1.0.0] - 2025-02-14
Release first version - Minesweeper Game with Next.js 15