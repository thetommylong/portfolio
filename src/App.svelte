<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { flavors } from "@catppuccin/palette";
    
    import Tooltip from './components/Tooltip.svelte';
    import Desktop from './components/Desktop.svelte';
    import Launcher from './components/Launcher.svelte';
    import Panel from './components/Panel.svelte';
    import LockScreen from './components/LockScreen.svelte';
    
    import { background, user } from './constants';
  import { lockScreen } from './state/lockScreen.svelte';

    let currentFlavorName: keyof typeof flavors = "mocha";
    let activeFlavor = flavors[currentFlavorName];
    let themeVariables = activeFlavor.colorEntries
        .map(([name, meta]) => `--${name}: ${meta.hex};`)
        .join(" ");
    
    $effect(() => {
        const target = document.getElementById('app');
        if (target) target.setAttribute('style', themeVariables);
    });
 
    // lock screen engine
    let unlocked = $state(false);
    const idlePeriod = 10 * 60 * 1000;
    let idleTimer: ReturnType<typeof setTimeout>;

    function resetIdleTimer() {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => { unlocked = false; }, idlePeriod);
    }

    // time
    let now = $state(new Date());
    const clockInterval = setInterval(() => now = new Date(), 1000);

    onMount(() => {
        // reset idle on events
        const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
        events.forEach(event => window.addEventListener(event, resetIdleTimer));

        // start the timer
        resetIdleTimer();
    });

    onDestroy(() => {
        // cleanup
        clearInterval(clockInterval);
        clearTimeout(idleTimer);
    });
</script>


<img
    id="background"
    src={lockScreen.locked ? background.blurred : background.normal}
    alt="Wallpaper"
    transition:fade={{ duration: 150 }}/>

{#if lockScreen.locked}
<LockScreen {now} />
{/if}

{#if !lockScreen.locked}
<div id="content" transition:fade={{ duration: 150 }}>
    <Panel {now} />
    <Launcher />
    <Desktop />
    <Tooltip />
</div>
{/if}

<style>
    :global(:root) {
        font-family: "Noto Sans", sans-serif;
        user-select: none;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;
    }

    :global(#app) {
        width: 100%;
        height: 100vh;
        --accent: var(--mauve);
        color: var(--text);
    }

    #background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index: -5;
        transform: scale(1.1);
    }
 
</style>