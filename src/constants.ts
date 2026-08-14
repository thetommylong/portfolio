import type { Application } from "./types/window"

import About from "./applications/About.svelte"
import Dolphin from "./applications/Dolphin.svelte"
import Konsole from "./applications/Konsole.svelte"
import Settings from "./applications/Settings.svelte"
import { settings } from "./state/settings.svelte"

export const user = {
    displayName: "TheTommylong",
    username: "tommylong",
    hostname: "portfolio",
    get avatarUrl() { return `https://github.com/${this.displayName}.png` }
}

export const background = settings.wallpaperUrl || "/background/mountain.png"

export const applications: Application[] = [
    {
        id: "info",
        name: "Info Center",
        description: "Provides information about me",
        app: About,
        icon: "/icons/hwinfo.svg",
        overrides: {
            height: 450,
            width: 900
        }
    },
    {
        id: "dolphin",
        name: "Dolphin",
        description: "Infomation about my projects",
        app: Dolphin,
        icon: "/icons/system-file-manager.svg"
    },
    {
        id: "konsole",
        name: "Konsole",
        description: "Terminal emulator",
        app: Konsole,
        icon: "/icons/utilities-terminal.svg"
    },
    {
        id: "settings",
        name: "System Settings",
        description: "Configure your experience",
        app: Settings,
        icon: "/icons/systemsettings.svg"
    }
]

export const info = [
    { label: "OS", value: "sveLinux" },
    { label: "Host", value: navigator.platform || "Web Client" },
    { label: "Kernel", value: "Full Stack Development" },
    { label: "Uptime", value: "Avaliable"},
    { label: "Shell", value: "TypeScript" },
    { label: "DE", value: "KDE Plasma" },
    { label: "WM", value: "KWin (HTML)" },
    { label: "WM Theme", value: "Breeze" },
    { label: "Theme", value: "Breeze (CatppuccinMocha)" },
    { label: "Icons", value: "breeze-dark" },
    { label: "Font", value: "Noto Sans" },
    
    { label: "Packages", value: "1 (pnpm)" }, 
    { label: "Memory", value: "Expert: TS, HTML, CSS | Familiar: Python, C++" },
    { label: "Locale", value: "en_US.UTF-8" }
];
