# Portfolio

A KDE Plasma desktop that lives in a browser tab. Real window manager, working terminal, actual apps that do things.

> [!IMPORTANT]
> Not affiliated with KDE or KDE e.V.

## The Problem

Everyone builds another todo app. I wanted to prove I could build something genuinely complex without it turning into a form with a database behind it — so I built an entire desktop environment instead. Dragging windows, z-order, focus management, a shell that parses commands. Make it weird, make it stick.

## The Solution

A browser-based Plasma clone built with Svelte 5 and TypeScript. Windows drag, resize, and minimize, and stack in the right order. Apps launch from a searchable launcher. There's a terminal that actually runs commands instead of printing canned strings.

## Features

### Window Manager

- 🪟 **Drag, resize, minimize** — full window lifecycle, with edge and corner handles
- 📐 **Z-order management** — clicking a window raises it above the rest
- 🎯 **Focus tracking** — only one window is focused at a time, and the panel reflects it
- 🔄 **State syncing** — Svelte reactivity propagates every change, no manual DOM juggling

### Applications

| App | What It Actually Does |
|-----|-----------------------|
| **Info Center** | System info, your profile, skill breakdown |
| **Dolphin** | Browses your GitHub repos via the API, with a preview pane |
| **Konsole** | A real terminal — see the command table below |
| **System Settings** | Themes, wallpaper, animation speed, click behavior |

### Konsole

Not a fake. Commands are real modules registered through `import.meta.glob`, with argument parsing, aliases, and proper exit codes.

| Command | Aliases | What It Does |
|---------|---------|--------------|
| `help` | — | List commands, or `help <cmd>` for detail |
| `fastfetch` | `neofetch` | System summary — also opens Info Center |
| `uname` | — | Kernel and host information |
| `whoami` | — | Current user |
| `jsh` | `node`, `deno` | **JavaScript REPL** — evaluates JS in the browser |
| `vim` | `vi`, `nvim` | Text editor |
| `sudo` | — | Run a command as another user |
| `echo` | — | Write arguments to output |
| `clear` | — | Clear the screen |
| `exit` | — | End the session |

### Interface

- 🎨 **Catppuccin themes** — Latte, Mocha, or Automatic (follows your system preference)
- 🖼️ **Custom wallpaper** — upload any image, persisted in IndexedDB
- 🔍 **Searchable launcher** — filter apps by name or description as you type
- 🔒 **Lock screen** — clock and a password field
- ⚡ **Animation speed** — scale it from instant to full, or let it be
- ♿ **Accessibility** — ARIA roles, focus-visible indicators, keyboard navigation, and full `prefers-reduced-motion` support
- 🔒 **Persistence** — theme, wallpaper, and preferences survive reloads

### Development

- ✅ **CI on every PR** — `svelte-check` + `tsc`, ESLint, and a production build
- 🧹 **Zero ESLint warnings** — typescript-eslint with `svelte-eslint-parser`

## Installation

Requires [pnpm](https://pnpm.io) and Node 22+.

```bash
git clone https://github.com/thetommylong/portfolio
cd portfolio
pnpm install
pnpm dev
```

Build for production:

```bash
pnpm build
```

## Usage

1. **Boot it** — the lock screen takes any password
2. **Launch things** — click the Plasma logo in the panel to toggle the launcher
3. **Open apps** — type to filter, arrow keys to select, `Enter` to launch
4. **Play with the terminal** — Konsole's `jsh` command will evaluate any JavaScript you throw at it

> Yes, `jsh` really does `eval` your input, in your own browser, on your own machine. That's the point of a REPL.

## Configuration

Everything lives in System Settings and persists to `localStorage`:

- **Theme** — Latte, Mocha, or Automatic
- **Wallpaper** — any image, stored in IndexedDB
- **Animation scale** — `0` (instant) through `2` (full)
- **Click behavior** — single-click to select vs. double-click to open

## Known Limitations

- **Not mobile.** It's a desktop environment. It works in a phone browser, but that's not the point.
- **The lock screen is cosmetic.** Any password unlocks it. There's no auth here.
- **No window snapping.** Deliberate — it was more work than it was worth.
- **Dolphin hits the GitHub API.** Rate-limited without a token, and cached for 24 hours to soften it.
- **No window layout persistence.** Windows reset on reload. Only preferences stick.
- **Animations may stutter** on weak hardware.
- **The terminal is a simulation.** `jsh` runs in your browser, not a real shell. Nothing touches your machine.

---

## Seriously, That's It

It's a Plasma clone in a browser tab with four apps and a terminal that fakes being a terminal. The window manager is the only part that would survive contact with a real product.

If you need a real desktop environment, [install KDE Plasma](https://kde.org/plasma-desktop/). This is a portfolio piece, not a replacement.

## License

- **Code:** [GPL-3.0-only](LICENSES/GPL-3.0-only.txt)
- **Icons:** [KDE Breeze](https://invent.kde.org/frameworks/breeze-icons) — LGPL-3.0-only, see [LICENSES/LGPL-v3+.txt](LICENSES/LGPL-v3+.txt)

KDE® and K Desktop Environment® are registered trademarks of KDE e.V.

## Contributing

Issues and PRs welcome. See [AGENTS.md](AGENTS.md) for agent setup and [docs/agents/](docs/agents/) for the issue tracker and domain docs.
