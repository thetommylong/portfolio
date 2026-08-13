# Portfolio

A KDE Plasma desktop in your browser. Started as a procrastination project that somehow became... actually kinda decent.

> [!IMPORTANT]
> Not affiliated with KDE or KDE e.V.

## The Problem

Everyone and their cousin makes a todo app. I wanted to show I could build complex UIs without the boring. So instead of a form or dashboard, I built an entire fake OS. Make it weird, make it stick.

## Basically the Featureset

- **Window manager that... actually works**: Windows drag, minimize, maximize. Handles z-order. Focus switching. Honestly surprised me how well it turned out.
- **Got real messy, then fixed it**: Started with everything crammed into one component file. Pain. Broke it into proper Svelte components. Night and day.
- **State syncing that doesn't drive you crazy**: Theme changes? Everything updates instantly. Open an app in the taskbar? Desktop knows. It's all wired to Svelte's reactivity.
- **Random fake apps because why not:**
  - *Info Center*: basically 
  - *Dolphin*: project browser
  - *Konsole*: pseudo-terminal (doesn't actually execute, but looks cool)
  - *System Settings*: theming and preferences

## Installation

> is that the right term?

```bash
git clone https://github.com/thetommylong/portfolio
cd portfolio
pnpm install
pnpm dev
```

Build: `pnpm build`

## Known Issues & Tradeoffs

- **Not mobile** (it's a desktop OS, come on)
- **Electron-adjacent performance** — runs fine, not super optimized
- **Some animations stutter** on weaker hardware (acknowledged, probably not fixing)
- **No window snapping** (too much work, honestly not worth it)

## License

- **Code:** GPLv3.0-only  
- **Icons:** [KDE Breeze](https://invent.kde.org/frameworks/breeze-icons) (LGPLv3.0-only)

KDE® and K Desktop Environment® are registered trademarks of KDE e.V.