<script>
    import { onDestroy } from "svelte";
    import { fade } from "svelte/transition";
    import { tooltip } from "../state/tooltip.svelte";

    onDestroy(() => {
        tooltip.destroy();
    });
</script>

{#if tooltip.show}
<div id="tooltip"
     role="tooltip"
     use:tooltip.registerElement
     transition:fade={{ duration: 150 }}
     style:left={tooltip.x}px
     style:top={tooltip.y}px>
    <p id="tooltip-text">{tooltip.text}</p>
    <p id="tooltip-alt">{tooltip.altText}</p>
</div>
{/if}

<style>
    #tooltip {
        width: max-content;
        position: fixed;
        background: var(--mantle);
        color: var(--text);
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid transparent;
        pointer-events: none;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        z-index: 1000;
        
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    #tooltip-text {
        font-size: 0.9rem;
        font-weight: 600;
        margin: 0;
    }

    #tooltip-alt {
        font-size: 0.75rem;
        color: var(--subtext0);
        margin: 0;
    }
</style>