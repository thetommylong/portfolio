import type { Application, Window } from "../types/window";

let windows = $state<Window[]>([]);
let currentIndex = $state(10);

export const wm = {
    get windows() { return windows; },
    get currentIndex() { return currentIndex; },
    
    openApplication(app: Application) {
        currentIndex += 1;
        const newWindow: Window = {
            instanceId: `${app.id}-${Date.now()}`,
            appId: app.id,
            name: app.name,
            component: app.app,
            x: 100 + (windows.length * 25),
            y: 100 + (windows.length * 25),
            zIndex: currentIndex
        };
        windows = [...windows, newWindow];
    },
    
    focusWindow(instanceId: string) {
        currentIndex += 1;
        windows = windows.map(w => w.instanceId === instanceId ? { ...w, zIndex: currentIndex } : w);
    },
    
    closeWindow(instanceId: string) {
        windows = windows.filter(w => w.instanceId !== instanceId);
    }
}