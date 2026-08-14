<script lang="ts">
    import { slide, fade } from 'svelte/transition';
    import { launcher } from '../state/launcher.svelte.js';
    import { wm } from '../state/wm.svelte.js';
    import { sessionMenu } from '../state/sessionMenu.svelte.js';
    import { lockScreen } from '../state/lockScreen.svelte.js';
    import { user } from '../constants.js';
    import Icon from './Icon.svelte';
  import { settings } from '../state/settings.svelte.js';
    
    function focusSelf(node: HTMLInputElement) {
        node.focus();
    }

    function handleKeyDown(event: KeyboardEvent) {
        const listLength = launcher.applications.length;
        if (listLength === 0) return;

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            launcher.selectedIndex = (launcher.selectedIndex + 1) % listLength;
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            launcher.selectedIndex = (launcher.selectedIndex - 1 + listLength) % listLength;
        } else if (event.key === 'Enter') {
            event.preventDefault();
            const activeApp = launcher.applications[launcher.selectedIndex];
            if (activeApp) {
                wm.openApplication(activeApp);
                launcher.close();
            }
        } else if (event.key === 'Escape') {
            launcher.close();
        }
    }

    let displayedName = $state(user.displayName);
</script>



{#if launcher.isOpen}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="launcher"
     transition:slide={{ duration: 150 * settings.animationSpeed }}
     onclick={(e) => e.stopPropagation()}
     onkeydown={handleKeyDown}>
    <div id="header">
        <div id="user">
            <div id="profile"><div id="sName">TT</div></div>
            <div id="name"
                 onmouseenter={() => { displayedName = `${user.username}@portfolio` }}
                 onmouseleave={() => { displayedName = user.displayName; }}>
                 {displayedName}</div>
        </div>
        <div id="search-box">
            <Icon name="system-search-symbolic" mode="mask" class="icon" />
            <input 
                use:focusSelf
                type="text" 
                placeholder="Search..." 
                bind:value={launcher.searchQuery}
            />
        </div>
        <div id="actions">
            <Icon
                 name="settings-configure-symbolic"
                 class="icons"
            />
            <Icon
                 name={launcher.pinned ? "window-unpin-symbolic" : "window-pin-symbolic"}
                 class="icons"
                 onclick={launcher.togglePinned}
            />
        </div>
    </div>
    
    <div id="apps-list">
        {#each launcher.applications as app, i}
            <div class="app-item"
                 class:active={i === launcher.selectedIndex}
                 role="button"
                 tabindex="0"
                 onmouseenter={() => launcher.selectedIndex = i}
                 onclick={() => {
                     wm.openApplication(app);
                     launcher.close();
                 }}>
                <Icon name={app.icon} alt={app.name} class="app-item-icon" mode="img" />
                <div class="app-item-meta">
                    <span class="app-item-name">{app.name}</span>
                    <span class="app-item-desc">{app.description}</span>
                </div>
            </div>
        {/each}
    </div>
    
    <div id="footer">
        <div id="power-actions">
            <div class="power-action"
                 onclick={ () => {window.location.href = window.location.pathname + window.location.search + (window.location.search ? '&' : '?') + 't=' + Date.now();} }>
                <Icon class="icon action-icon" name="system-reboot-symbolic" />Restart
            </div>
            <div class="power-action"
                 onclick={ () => {
                    const body = document.querySelector("body")!;
                    body.innerHTML = "";
                    body.style.backgroundColor = "#000";
                    body.style.cursor = "none";
                    } }>
                <Icon class="icon action-icon" name="system-shutdown-symbolic" />Shut Down
            </div>
            <div class="power-action" onclick={(e) => sessionMenu.toggle(e)}>
                <Icon class="icon action-icon" name="system-log-out-circle" />Session
            </div>
        </div>
    </div>
</div>
{/if}

{#if sessionMenu.isOpen}
<div id="session-dropdown" 
         use:sessionMenu.register
         transition:fade={{ duration: 100 * settings.animationSpeed }}
         style:top="{sessionMenu.y}px"
         style:left="{sessionMenu.x}px">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="session-options" onclick={() => { lockScreen.locked = true; sessionMenu.close(); }}><Icon name="lock-symbolic" class="icon action-icon"/>Lock</div>
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="session-options" onclick={() => { lockScreen.locked = true; sessionMenu.close(); }}><Icon name="system-switch-user-symbolic" class="icon action-icon"/>Switch User</div>
    </div>
{/if}

<style>
    #launcher :global(.icon) {
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
        mask-size: contain !important;
    }

    #launcher, #launcher * {
        box-sizing: border-box;
    }

    #launcher {
        position: absolute;
        top: 46px;
        left: 0;
        width: 640px;
        height: 500px;
        background: var(--mantle);
        border: 1px solid var(--surface0);
        box-shadow: 0 8px 32px rgba(0,0,0,0.4);
        display: flex;
        flex-direction: column;
        z-index: 999;
        overflow: hidden;
        border-bottom-right-radius: 6px;
    }

    #launcher #header,
    #launcher #footer {
        padding: 8px 16px;
        display: flex;
    }

    #launcher #header {
        border-bottom: 1px solid var(--surface0);
    }

    #launcher #header #user {
        flex: 1;
        display: flex;
        height: 100%;
        align-items: center;
    }

    #launcher #header #user #profile {
        width: 32px;
        height: 32px;
        background-color: var(--surface0);
        border: 1px solid var(--accent);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #launcher #header #user #profile #sName {
        text-align: center;
        color: var(--accent);
    }

    #launcher #header #user #name {
        margin-left: 6px;
        overflow: hidden;
    }

    #launcher #header #search-box {
        display: flex;
        align-items: center;
        gap: 5px;
        padding: 6px 12px;

        background: var(--base);
        border: 1px solid var(--surface1);
        border-radius: 4px;
        width: 50%;
    }

    #launcher #header #search-box :global(.icon) {
        height: 16px;
        width: 16px;
    }

    #launcher #header #search-box input {
        flex: 1;
        height: 16px;
        background: transparent;
        border: none;
        outline: none;
        color: var(--text);
        padding: 0;
        font-size: 0.9rem;
    }

    #launcher #header #search-box:focus-within {
        border-color: var(--accent);
    }

    #launcher #header #actions {
        display: flex;
        margin-left: 4px;
    }

    #launcher #header #actions :global(.icons) {
        width: 32px;
        height: 32px;
        scale: 0.75;
    }

    #launcher #apps-list {
        flex: 1;
        overflow-y: auto;
        padding: 6px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    #launcher .app-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px;
        border-radius: 6px;
        cursor: pointer;
    }

    .app-item:hover,
    .app-item.active {
        outline: none;
    }

    .app-item.active {
        background: var(--surface0);
        border: 1px solid var(--accent);
    }

    .app-item :global(.app-item-icon) {
        width: 32px;
        height: 32px;
    }

    .app-item .app-item-meta {
        display: flex;
        flex-direction: column;
    }

    .app-item .app-item-meta .app-item-name {
        font-size: 0.9rem;
        font-weight: 500;
    }

    .app-item .app-item-meta .app-item-desc {
        font-size: 0.75rem;
        color: var(--subtext0);
    }
    
    #launcher #footer {
        border-top: 1px solid var(--surface0);
    }

    #power-actions {
        display: flex;
        gap: 8px;
        margin-left: auto;
    }

    .power-action {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid transparent;
        border-radius: 4px;
        padding: 2px 6px 2px 2px;
        font-size: 14px;
    }

    .power-action:hover {
        border-color: var(--accent);
    }

    #launcher :global(.action-icon) {
        width: 20px;
        height: 20px;
        margin-right: 4px;
    }
    
    #session-dropdown {
        position: fixed;
        background: var(--mantle);
        border: 1px solid var(--surface0);
        border-radius: 6px;
        padding: 4px;
        display: flex;
        flex-direction: column;
        min-width: 130px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        z-index: 10001;
    }

    .session-options {
        background: transparent;
        border: none;
        color: var(--text);
        padding: 6px 12px;
        text-align: left;
        border-radius: 4px;
        cursor: pointer;
        font-size: 0.85rem;
        display: flex;
    }

    .session-options:hover {
        background: var(--surface0);
    }
</style>