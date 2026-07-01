<script lang="ts">
    import { onMount } from 'svelte';
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { wm } from '../state/wm.svelte.js';

    import type { Window } from '../types/window.js';
    import { panelState } from '../state/panel.svelte.js';
    import { launcher } from '../state/launcher.svelte.js';

    import { applications } from '../constants.js';

    let vpWidth = $state(0);
    let vpHeight = $state(0);

    let activeW: Window | null = null;
    let interactionType: 'drag' | 'resize' | null = $state(null);
    let lastX = 0;
    let lastY = 0;
    let resizeDirections = $state({ top: false, bottom: false, left: false, right: false });
    
    $effect(() => {
        if (vpWidth === 0 || vpHeight === 0) return;

        wm.windows.forEach((win: Window) => {
            const maxX = Math.max(0, vpWidth - 400);
            const maxY = Math.max(46, vpHeight - 300);

            if (win.x > maxX) win.x = maxX;
            if (win.y > maxY) win.y = maxY;
        });
    });
 
    function handleWindowMouseDown(e: MouseEvent, win: Window) {
        wm.focusWindow(win.instanceId);

        // check for alt + mouse1 (left click)
        if (e.altKey && e.button === 0) {
            e.preventDefault();
            e.stopPropagation();

            activeW = win;
            interactionType = 'drag';
            
            lastX = e.clientX;
            lastY = e.clientY;

            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', stopInteraction);
        }
        // again but for mouse2 (right click)
        else if (e.altKey && e.button === 2) {
            e.preventDefault();
            e.stopPropagation();

            const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const relativeY = e.clientY - rect.top;

            // determine anchor zone
            const isLeft = relativeX < rect.width / 2;
            const isTop = relativeY < rect.height / 2;

            resizeDirections = {
                top: isTop,
                bottom: !isTop,
                left: isLeft,
                right: !isLeft
            };

            activeW = win;
            interactionType = 'resize';
            
            lastX = e.clientX;
            lastY = e.clientY;

            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', stopInteraction);
        }
    }

    function startInteraction(e: MouseEvent, win: Window, type: 'drag' | 'resize') {
        e.preventDefault();
        e.stopPropagation();
        
        wm.focusWindow(win.instanceId);
        
        activeW = win;
        interactionType = type;
        
        lastX = e.clientX;
        lastY = e.clientY;

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', stopInteraction);
    }

    function handleGlobalMove(e: MouseEvent) {
        if (!activeW || !interactionType) return;

        const dX = e.clientX - lastX;
        const dY = e.clientY - lastY;

        const MIN_WIDTH = 200;
        const MIN_HEIGHT = 150;        

        if (interactionType === 'drag') {
            let newX = activeW.x + dX;
            let newY = activeW.y + dY;

            const maxX = vpWidth - activeW.width;
            const maxY = vpHeight - activeW.height;

            activeW.x = Math.max(0, Math.min(newX, maxX));
            activeW.y = Math.max(0, Math.min(newY, maxY));
        } 
        else if (interactionType === 'resize') {
            if (resizeDirections.right) {
                const newW = activeW.width + dX;
                if (newW >= MIN_WIDTH && activeW.x + newW <= vpWidth) {
                    activeW.width = Math.max(MIN_WIDTH, Math.min(newW, vpWidth - activeW.x));
                }
            } 
            else if (resizeDirections.left) {
                const newW = activeW.width - dX;
                const newX = activeW.x + dX;
                if (newW >= MIN_WIDTH && newX >= 0) {
                    activeW.width = newW;
                    activeW.x = newX;
                }
            }

            if (resizeDirections.bottom) {
                const newH = activeW.height + dY;
                if (newH >= MIN_HEIGHT && activeW.y + newH <= vpHeight) {
                    activeW.height = Math.max(MIN_HEIGHT, Math.min(newH, vpHeight - activeW.y));
                }
            } 
            else if (resizeDirections.top) {
                const newH = activeW.height - dY;
                const newY = activeW.y + dY;
                if (newH >= MIN_HEIGHT && newY >= 0) {
                    activeW.height = newH;
                    activeW.y = newY;
                }
            }
        }

        lastX = e.clientX;
        lastY = e.clientY;
    }
    
    function stopInteraction() {
        activeW = null;
        interactionType = null;
        window.removeEventListener('mousemove', handleGlobalMove);
        window.removeEventListener('mouseup', stopInteraction);
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div id="desktop"
     bind:clientWidth={vpWidth}
     bind:clientHeight={vpHeight}
     style:--panel-height="{panelState.height}px"
     class:dragging={interactionType === 'drag'}
     class:resizing-nwse={interactionType === 'resize' && ((resizeDirections.top && resizeDirections.left) || (resizeDirections.bottom && resizeDirections.right))}
     class:resizing-nesw={interactionType === 'resize' && ((resizeDirections.top && resizeDirections.right) || (resizeDirections.bottom && resizeDirections.left))}
     onclick={() => launcher.close()}>
    {#each wm.windows as win (win.instanceId)}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="window"
            class:minimized={!win.isVisible}
            style:top="{win.y}px" 
            style:left="{win.x}px" 
            style:width="{win.width}px"
            style:height="{win.height}px"
            style:z-index={win.zIndex}
            transition:scale={{ duration: 200, start: 0.92, easing: cubicOut }}
            oncontextmenu={(e) => { if (e.altKey) e.preventDefault(); }}
            onmousedown={(e) => handleWindowMouseDown(e, win)}
            >
            <div style="background: rgba(0,0,0,0.8); color: #0f0; font-family: monospace; font-size: 10px; padding: 4px; position: absolute; top: 30px; left: 0; z-index: 9999;">Pos: {win.x}px, {win.y}px | Size: {win.width}px x {win.height}px</div>
            <div class="titlebar" onmousedown={(e) => startInteraction(e, win, "drag")}>
                <span class="title">{win.name}</span>
                <div class="action-buttons">
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="minimize-btn" onclick={(e) => {
                        e.stopPropagation();
                        wm.toggleVisibility(win.instanceId);
                    }}><div class="action-icon" style:mask=url(/icons/window-minimize-symbolic.svg)></div></button>
                    <!-- svelte-ignore a11y_consider_explicit_label -->
                    <button class="close-btn" onclick={(e) => {
                        e.stopPropagation();
                        wm.closeWindow(win.instanceId);
                    }}><div class="action-icon" style:mask=url(/icons/tab-close-symbolic.svg)></div></button>
                </div>
            </div>
            
            <div class="window-content">
                <win.component />
            </div>

            <div class="resize-handle corner-br" onmousedown={(e) => startInteraction(e, win, "resize")}></div>
        </div>
    {/each}
</div>

<style>
    #desktop {
        position: fixed;
        top: var(--panel-height);
        left: 0;
        width: 100vw;
        height: calc(100vh - var(--panel-height));
        pointer-events: auto;
        z-index: 1;
    }

    #desktop .window {
        position: absolute;
        width: 400px;
        height: 300px;
        background: var(--base);
        border: 1px solid var(--surface0);
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        pointer-events: auto;
        transition: transform 0.25s cubic-bezier(0.1, 0.9, 0.2, 1), 
                    opacity 0.2s ease-out, 
                    visibility 0.25s;
        transform: scale(1);
        opacity: 1;
        visibility: visible;
        transform-origin: top center; 
    }

    #desktop .window.minimized {
        transform: scale(0.92);
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
    }

    .window .titlebar {
        background: var(--mantle);
        padding: 6px 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
    }

    .window .titlebar .title {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        font-size: .85rem;
    }

    .window .titlebar .action-buttons {
        margin-left: auto;
    }
    
    .window .titlebar .action-buttons * {
        background: none;
        border: none;
        color: white;
        padding: 0;
        margin: 1px;
    }

    .window .titlebar .action-buttons .action-icon {
        background-color: var(--text);
        border-radius: 50%;
    }
    
    .window .titlebar .action-buttons .close-btn:hover {
        background-color: var(--accent);
        border-radius: 50%;
    }

    .window .titlebar .action-buttons .close-btn:hover .action-icon {
        background-color: var(--base);
    }
    
    .window .titlebar .action-buttons .minimize-btn:hover {
        background-color: var(--surface0);
        border-radius: 50%;
    }
    
    .action-icon {
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
        mask-size: contain !important;
        width: 16px;
        height: 16px;
    }

    .window .window-content {
        flex: 1;
        padding: 16px;
        overflow: auto;
    } 
    
    .window .resize-handle {
        position: absolute;
        background: transparent;
        z-index: 999;
    }
    
    #desktop.dragging,
    #desktop.dragging * {
        cursor: move !important;
        user-select: none !important;
    }

    #desktop.resizing-nwse,
    #desktop.resizing-nwse * {
        cursor: nwse-resize !important;
        user-select: none !important;
    }

    #desktop.resizing-nesw,
    #desktop.resizing-nesw * {
        cursor: nesw-resize !important;
        user-select: none !important;
    }
    .window .resize-handle.corner-br {
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        cursor: nwse-resize;
    }
</style>