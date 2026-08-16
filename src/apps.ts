import type { Application } from "./types/window"

import About from "./applications/About.svelte"
import Dolphin from "./applications/Dolphin.svelte"
import Konsole from "./applications/Konsole.svelte"
import Settings from "./applications/Settings.svelte"

import hwinfo from "/icons/hwinfo.svg?url"
import dolphin from "/icons/system-file-manager.svg?url"
import terminal from "/icons/utilities-terminal.svg?url"
import settingsIcon from "/icons/systemsettings.svg?url"

export const applications: Application[] = [
    {
        id: "info",
        name: "Info Center",
        description: "Provides information about me",
        app: About,
        icon: hwinfo,
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
        icon: dolphin
    },
    {
        id: "konsole",
        name: "Konsole",
        description: "Terminal emulator",
        app: Konsole,
        icon: terminal
    },
    {
        id: "settings",
        name: "System Settings",
        description: "Configure your experience",
        app: Settings,
        icon: settingsIcon
    }
]