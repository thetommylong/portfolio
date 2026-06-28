import type { Application, Window } from "../types/window";

let windows = $state<Window[]>([]);
let currentIndex = $state(10);

export const wm = {
    get windows() { return windows; },
    get currentIndex() { return currentIndex; },
    
    openApplication(app: Application) {
        currentIndex += 1;
        windows.push({
            instanceId: `${app.id}-${Date.now()}`,
            appId: app.id,
            name: app.name,
            component: app.app,
            x: 100 + (windows.length * 25),
            y: 100 + (windows.length * 25),
            width: 400,
            height: 300,
            zIndex: currentIndex
        });
    },
    
    focusWindow(instanceId: string) {
        const win = windows.find(w => w.instanceId === instanceId);
        if (win) {
            currentIndex += 1;
            win.zIndex = currentIndex; 
        }
    },
    
    closeWindow(instanceId: string) {
        windows = windows.filter(w => w.instanceId !== instanceId);
    }
}