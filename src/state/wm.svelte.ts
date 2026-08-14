import { applications } from "../constants";
import type { Application, Window } from "../types/window";

let windows = $state<Window[]>([]);
let currentIndex = $state(10);
let focused: Window | null = $state(null);

export const wm = {
    get windows() { return windows; },
    get currentIndex() { return currentIndex; },

    openApplication(app: Application) {
        currentIndex += 1;

        const window = {
            instanceId: `${app.id}-${Date.now()}`,
            appId: app.id,
            name: app.name,
            component: app.app,
            x: 100 + (windows.length * 25),
            y: 100 + (windows.length * 25),
            width: 800,
            height: 600,
            zIndex: currentIndex,
            isVisible: true,
            ...app.overrides
        }

        windows.push(window);
        focused = window;
    },

    openAppById(appId: string, overrides: Application["overrides"] = {}) {
        const app = applications.find(a => a.id === appId);
        if (app) this.openApplication({ ...app, ...overrides });
    },
    
    focusWindow(instanceId: string) {
        const win = windows.find(w => w.instanceId === instanceId);
        if (win) {
            currentIndex += 1;
            win.zIndex = currentIndex;
            focused = win;
        }
    },
    
    toggleVisibility(instanceId: string) {
        const win = windows.find(w => w.instanceId === instanceId);
        if (!win) return;

        if (win.isVisible) {
            this.focusWindow(instanceId);
        }

        win.isVisible = !win.isVisible;
    },

    closeWindow(instanceId: string) {
        windows = windows.filter(w => w.instanceId !== instanceId);
    },

    isVisible(instanceId: string) {
        const win = windows.find(w => w.instanceId === instanceId);
        if (!win) return false;
        
        return win.isVisible;
    },

    isRunning(appId: string) {
        return windows.filter(w => w.appId === appId).length > 0;
    },

    isFocused(instanceId: string) {
        return (focused?.instanceId === instanceId);
    },

    isAppFocused(appId: string) {
        return (focused?.appId === appId)
    }
}