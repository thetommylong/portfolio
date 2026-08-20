import { settings } from "./state/settings.svelte"

import wallpaper from "/background/mountain.jpg?url"

export const user = {
    displayName: "TheTommylong",
    username: "tommylong",
    hostname: "portfolio",
    get avatarUrl() { return `https://github.com/${this.displayName}.png` }
}

export const background = settings.wallpaperUrl || wallpaper

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
