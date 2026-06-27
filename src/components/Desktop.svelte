<script lang="ts">
    import { scale } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';
    import { wm } from '../state/wm.svelte.js';

    import type { Window } from '../types/window.js';
    import { panelState } from '../state/panel.svelte.js';
    import { launcher } from '../state/launcher.svelte.js';

    let viewportWidth = $state(0);
    let viewportHeight = $state(0);

    $effect(() => {
        if (viewportWidth === 0 || viewportHeight === 0) return;

        wm.windows.forEach((win: Window) => {
            const maxX = Math.max(0, viewportWidth - 400);
            const maxY = Math.max(46, viewportHeight - 300);

            if (win.x > maxX) win.x = maxX;
            if (win.y > maxY) win.y = maxY;
        });
    });
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div id="desktop"
     bind:clientWidth={viewportWidth}
     bind:clientHeight={viewportHeight}
     style:--panel-height="{panelState.height}px"
     onclick={() => launcher.close()}>
    {#each wm.windows as win (win.instanceId)}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="window"
            style:top="{win.y}px" 
            style:left="{win.x}px" 
            style:z-index={win.zIndex}
            transition:scale={{ duration: 200, start: 0.92, easing: cubicOut }}
            onmousedown={() => wm.focusWindow(win.instanceId)}
            >
            <div class="titlebar">
                <span class="title">{win.name}</span>
                <button class="close-btn" onclick={(e) => {
                    e.stopPropagation();
                    wm.closeWindow(win.instanceId);
                }}>✕</button>
            </div>
            
            <div class="window-content">
                <win.component />
            </div>
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
</style>