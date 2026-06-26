import type { Component } from "svelte";

export interface Window {
    instanceId: string;
    appId: string;
    name: string;
    component: any;
    x: number;
    y: number;
    zIndex: number;
}

export interface Application {
    id: string;
    name: string;
    description: string;
    app: Component;
    icon: string;
}