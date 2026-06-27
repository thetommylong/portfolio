<script lang="ts">
    import { wm } from '../state/wm.svelte';
    import { launcher } from '../state/launcher.svelte';
    import { panelState } from '../state/panel.svelte';
    import { tooltip } from '../state/tooltip.svelte';
    import { applications } from '../constants';

    let { now } = $props();
</script>

<div id="panel" style:--panel-height="{panelState.height}px">
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
         }}></div>

    <div id="task-manager">
        {#each applications as app}
            <div class="task"
                 role="button"
                 tabindex="0"
                 onmouseenter={(e) => tooltip.hover(e, app.name, app.description)}
                 onmouseleave={tooltip.leave}
                 onmousedown={() => wm.openApplication(app)}>
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

    <div id="notification" style:mask="url(/icons/notifications.svg)"></div>
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
        background-color: var(--text);
        mask: url(/icons/plasma-logo-monochrome.svg);
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
    }

    #clock span {
        line-height: 1;
        text-align: center;
    }

    #clock #panel-date {
        font-size: 0.85rem;
    }
 
    #panel #notification {
        height: calc(var(--panel-height) * 0.7);
        width: calc(var(--panel-height) * 0.7);
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
        margin-right: 1rem;
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
</style>