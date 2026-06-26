<script lang="ts">
    import { slide } from 'svelte/transition';
    import { launcher } from '../state/launcher.svelte.js';
    import { wm } from '../state/wm.svelte.js';
</script>

{#if launcher.isOpen}
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="launcher" transition:slide={{ duration: 150 }} onclick={(e) => e.stopPropagation()}>
    <div id="header">
        <div id="search-box">
            <div style:background={"/system-search-symbolic.svg"}></div>
            <!-- svelte-ignore a11y_autofocus -->
            <input 
                type="text" 
                placeholder="Search..." 
                bind:value={launcher.searchQuery}
                autofocus
            />
        </div>
    </div>
    
    <div id="apps-list">
        {#each launcher.applications as app}
            <div class="app-item" role="button" tabindex="0" onclick={() => {
                wm.openApplication(app);
                launcher.close();
            }}>
                <img src={app.icon} alt={app.name} class="app-item-icon" />
                <div class="app-item-meta">
                    <span class="app-item-name">{app.name}</span>
                    <span class="app-item-desc">{app.description}</span>
                </div>
            </div>
        {/each}
    </div>
    
    <div id="footer">
        a
    </div>
</div>
{/if}

<style>
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

    #launcher #footer {
        height: 30px;
    }

    #launcher #header {
        height: 30px;
        display: flex;
    }

    #launcher #header #search-box {
        height: 30px;
        padding: 6px 24px;
        border-bottom: 1px solid var(--surface0);
    }

    #launcher #header #search-box input {
        height: 16px;
        width: calc(100% - 16px);
        padding: 6px 8px;
        background: var(--base);
        border: 1px solid var(--surface1);
        border-radius: 4px;
        color: var(--text);
        outline: none;
    }

    #launcher #header #search-box input:focus {
        border-color: var(--accent);
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

    .app-item:hover {
        background: var(--surface0);
    }

    .app-item .app-item-icon {
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
</style>