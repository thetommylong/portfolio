<script lang="ts">
    import { wm } from '../state/wm.svelte.ts';
    import type { Application } from '../types/window';
    import { launcher } from '../state/launcher.svelte';
    import { panelState } from '../state/panel.svelte';
    import { tooltip } from '../state/tooltip.svelte';
    import { applications } from '../apps';
  import Icon from './Icon.svelte';

    let { now } = $props();

    function onTaskInteraction(app: Application) {
        if (!wm.isRunning(app.id)) wm.openApplication(app);
        else {
            const instances = wm.windows.filter(w => w.appId === app.id);
            const focused = instances.find(w => wm.isFocused(w.instanceId));

            if (focused) {
                const cur = instances.indexOf(focused);
                const next = (cur + 1) % instances.length;
                if (cur != next) wm.focusWindow(instances[next].instanceId);
                else { wm.toggleVisibility(focused.instanceId) }
            } else {
                // Focus the first available instance
                wm.focusWindow(instances[0].instanceId);
            }

        }
    }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div id="panel"
     style:--panel-height="{panelState.height}px"
     onclick={(e) => {
        e.stopPropagation();
        launcher.close();
     }}>
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div id="launcher-icon"
         tabindex="0"
         onmouseenter={(e) => tooltip.hover(e, "Application Launcher", "Launcher to start applications")}
         onmouseleave={tooltip.leave}
         onclick={(e) => {
            e.stopPropagation();
            launcher.toggle();
         }}><Icon class="icon" name="plasma-logo-monochrome" /></div>

    <div id="task-manager">
        {#each applications as app}
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="task"
                 class:active={wm.isRunning(app.id)}
                 class:focused={wm.isAppFocused(app.id)}
                 role="button"
                 tabindex="0"
                 onmouseenter={(e) => tooltip.hover(e, app.name, app.description)}
                 onmouseleave={tooltip.leave}
                 onclick={() => onTaskInteraction(app)}>
                <div class="task-icon" style:background="url({app.icon})"></div>
            </div>
        {/each}
    </div>

    <div id="clock">
        <span id="panel-time">
            {now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'})}
        </span>
        <span id="panel-date">
            {now.toLocaleDateString([], {dateStyle: "short"})}
        </span>
    </div>
</div>

<style>
    #panel {
        display: flex;
        align-items: center;
        width: 100vw;
        height: var(--panel-height);
        background-color: var(--mantle);
    }

    #panel #launcher-icon {
        display: flex;
        height: var(--panel-height);
        width: var(--panel-height);
        margin-left: .5rem;
    }
    
    #panel #launcher-icon :global(.icon) {
        height: 100%;
        width: 100%;
        background-color: var(--text);
        transform: scale(0.7);
        margin-left: .5rem;
    }

    #panel #clock {
        display: flex;
        margin-left: auto;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 6rem;
        height: 100%;
    
        padding-right: 2rem;
    }

    #clock span {
        line-height: 1;
        text-align: center;
    }

    #clock #panel-date {
        font-size: 0.85rem;
    }
 
    #panel #task-manager {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }

    #task-manager .task {
        height: var(--panel-height);
        width: var(--panel-height);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #task-manager .task .task-icon {
        height: calc(var(--panel-height) * 0.7);
        width: calc(var(--panel-height) * 0.7);
        background-size: contain !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
    }

    .task.active {
        background-color: var(--surface0);
        box-shadow: inset 0 -4px 0 0 var(--surface1);
    }

    .task.focused {
        background-color: color-mix(in srgb, var(--accent), black 40%);
        box-shadow: inset 0 -4px 0 0 var(--accent);
    }
</style>