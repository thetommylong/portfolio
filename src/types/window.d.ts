import type { Component } from "svelte";

export interface Window {
    instanceId: string;
    appId: string;
    name: string;
    component: Component;
    x: number;
    y: number;
    width: number;
    height: number;
    zIndex: number;
    isVisible: boolean;
}

export interface Application {
    id: string;
    name: string;
    description: string;
    app: Component;
    icon: string;
    overrides?: Partial<Omit<Window, 'instanceId' | 'appId' | 'zIndex' | 'component'>>;
}