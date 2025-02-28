# Minesweeper Changelog
All notable changes to this project will be documented in this file.

## 📍 [1.1.0] - 2017-03-15
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