<script lang="ts">
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { wm } from '../state/wm.svelte.js';

    import type { Window } from '../types/window.js';
    import { panelState } from '../state/panel.svelte.js';
    import { launcher } from '../state/launcher.svelte.js';

    let vpWidth = $state(0);
    let vpHeight = $state(0);

    let activeW: Window | null = null;
    let interactionType: 'drag' | 'resize' | null = null;
    let sX = 0;
    let sY = 0;
    let sWinX = 0;
    let sWinY = 0;
    let sWinW = 0;
    let sWinH = 0; 
    
    $effect(() => {
        if (vpWidth === 0 || vpHeight === 0) return;

        wm.windows.forEach((win: Window) => {
            const maxX = Math.max(0, vpWidth - 400);
            const maxY = Math.max(46, vpHeight - 300);

            if (win.x > maxX) win.x = maxX;
            if (win.y > maxY) win.y = maxY;
        });
    });

    function startInteraction(e: MouseEvent, win: Window, type: 'drag' | 'resize') {
        e.preventDefault();
        e.stopPropagation();
        
        wm.focusWindow(win.instanceId);
        
        activeW = win;
        interactionType = type;
        sX = e.clientX;
        sY = e.clientY;
        sWinX = win.x;
        sWinY = win.y;
        sWinW = win.width || 400;
        sWinH = win.height || 300;

        window.addEventListener('mousemove', handleGlobalMove);
        window.addEventListener('mouseup', stopInteraction);
    }

    function handleGlobalMove(e: MouseEvent) {
        if (!activeW || !interactionType) return;

        const deltaX = e.clientX - sX;
        const deltaY = e.clientY - sY;

        if (interactionType === 'drag') {
            let newX = sWinX + deltaX;
            let newY = sWinY + deltaY;

            const maxX = vpWidth - activeW.width;
            const maxY = vpHeight - activeW.height;

            activeW.x = Math.max(0, Math.min(newX, maxX));
            activeW.y = Math.max(0, Math.min(newY, maxY));
        } 
        else if (interactionType === 'resize') {
            let newW = sWinW + deltaX;
            let newH = sWinH + deltaY;

            activeW.width = Math.max(200, Math.min(newW, vpWidth - activeW.x));
            activeW.height = Math.max(150, Math.min(newH, vpHeight - activeW.y));
        }
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
     onclick={() => launcher.close()}>
    {#each wm.windows as win (win.instanceId)}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="window"
            style:top="{win.y}px" 
            style:left="{win.x}px" 
            style:width="{win.width}px"
            style:height="{win.height}px"
            style:z-index={win.zIndex}
            transition:scale={{ duration: 200, start: 0.92, easing: cubicOut }}
            onmousedown={() => wm.focusWindow(win.instanceId)}
            >
            <div style="background: rgba(0,0,0,0.8); color: #0f0; font-family: monospace; font-size: 10px; padding: 4px; position: absolute; top: 30px; left: 0; z-index: 9999;">Pos: {win.x}px, {win.y}px | Size: {win.width}px x {win.height}px</div>
            <div class="titlebar" onmousedown={(e) => startInteraction(e, win, "drag")}>
                <span class="title">{win.name}</span>
                <button class="close-btn" onclick={(e) => {
                    e.stopPropagation();
                    wm.closeWindow(win.instanceId);
                }}>✕</button>
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

    .window .titlebar .close-btn {
        background: none;
        border: none;
        color: white;
        margin-left: auto;
    }

    .window .titlebar .close-btn:hover {
        background-color: var(--accent);
        border-radius: 50%;
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

    .window .resize-handle.corner-br {
        bottom: 0;
        right: 0;
        width: 12px;
        height: 12px;
        cursor: nwse-resize;
    }
</style>