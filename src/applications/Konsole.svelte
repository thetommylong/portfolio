<script lang="ts">
    import { bash } from "../state/bash.svelte";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div id="container" use:bash.register>
    <div id="history">
        {#each bash.history as line}
            <div class="line">{line}</div>
        {/each}
    </div>
    <div id="input-container">
        <div id="prompt">{bash.prompt}</div>
        <input use:bash.registerInput id="command" type="text" onkeydown={(e) => bash.handleKeyDown(e)} autocomplete="off" autocapitalize="off" spellcheck="false">
    </div>
</div>

<style>
    #container {
        background-color: var(--base);
        color: var(--text);
        font-family: "JetBrains Mono", "Consolas", monospace;
        font-size: 10pt;
        width: 100%;
        height: 100%;
    }

    #input-container {
        display: flex;
        align-items: center;
        background-color: transparent;
    }

    #input-container #prompt {
        margin-right: 0.5rem; 
    }

    #input-container #command {
        background: none;
        outline: none;
        border: none;
        padding: 0;
        color: var(--text);
        font-family: "JetBrains Mono", "Consolas", monospace;
        flex: 1;
    }
</style>