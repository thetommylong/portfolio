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
const currentSettings = $state<Settings>(initialSettings);

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

        const speed = prefersReducedMotion ? 0 : currentSettings.animationSpeed;
        document.body.style.setProperty('--speed', `${speed}`);

        const resolvedTheme = resolveFlavorName(currentSettings.colorScheme).toString();
        document.documentElement.setAttribute("data-theme", resolvedTheme);
    });
});

const prefersReducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = $state(prefersReducedMotionQuery.matches);
prefersReducedMotionQuery.addEventListener("change", () => { prefersReducedMotion = prefersReducedMotionQuery.matches; });

export const settings = {
    get animationSpeed() { return prefersReducedMotion ? 0 : currentSettings.animationSpeed },
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