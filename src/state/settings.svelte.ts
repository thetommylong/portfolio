import { get, set } from 'idb-keyval';
import { colorScheme, type Settings } from "../types/settings";
import { flavors } from '@catppuccin/palette';
type FlavorKey = keyof typeof flavors;

const saved = localStorage.getItem("settings");

const initialSettings: Settings = {
    animationSpeed: 1,
    colorScheme: colorScheme.Automatic,
    maniac: false,
    wallpaper: null,
    ...(saved ? JSON.parse(saved) : {})
};
let currentSettings = $state<Settings>(initialSettings);

// wallpaper might be too big so
let wallpaperUrl = $state<string | null>(null);

const file = await get<File>('wallpaper');
if (file) {
    wallpaperUrl = URL.createObjectURL(file);
}

export function resolveFlavorName(scheme: colorScheme): FlavorKey {
    if (scheme === colorScheme.Automatic) {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "mocha" : "latte";
    }
    return scheme as unknown as FlavorKey;
}

$effect.root(() => {
    $effect(() => {
        localStorage.setItem("settings", JSON.stringify(currentSettings));

        document.body.style.setProperty('--speed', `${currentSettings.animationSpeed}`);

        const resolvedTheme = resolveFlavorName(currentSettings.colorScheme).toString();
        document.documentElement.setAttribute("data-theme", resolvedTheme);
    });
});

export const settings = {
    get animationSpeed() { return currentSettings.animationSpeed },
    set animationSpeed(value) {currentSettings.animationSpeed = value },
    get colorScheme() { return currentSettings.colorScheme },
    set colorScheme(value: colorScheme) { currentSettings.colorScheme = value },
    get doubleClickToOpen() { return !currentSettings.maniac },
    set doubleClickToOpen(value) { currentSettings.maniac = !value },
    get wallpaperUrl() { return wallpaperUrl; },
    async setWallpaper(file: File | null) {
        if (wallpaperUrl) {
            URL.revokeObjectURL(wallpaperUrl);
        }

        if (file) {
            await set('wallpaper', file);
            wallpaperUrl = URL.createObjectURL(file);
        } else {
            await set('wallpaper', null);
            wallpaperUrl = null;
        }
    }
};