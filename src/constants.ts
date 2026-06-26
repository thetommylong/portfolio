import type { Application } from "./types/window"
import About from "./applications/About.svelte"

export const user = {
    displayName: "TheTommylong",
    username: "tommylong",
}

export const background = {
    normal: "/background/mountain.png",
    blurred: "/background/mountain-blurred.png",
}

export const applications: Application[] = [
    {
        id: "info",
        name: "Info Center",
        description: "Provides information about me",
        app: About,
        icon: "/icons/hwinfo.svg"
    },
    {
        id: "dolphin",
        name: "Dolphin",
        description: "Infomation about my projects",
        app: About,
        icon: "/icons/system-file-manager.svg"
    },
    {
        id: "konsole",
        name: "Konsole",
        description: "Terminal emulator",
        app: About,
        icon: "/icons/utilities-terminal.svg"
    },
    {
        id: "settings",
        name: "System Settings",
        description: "Configure your experience",
        app: About,
        icon: "/icons/systemsettings.svg"
    }
]