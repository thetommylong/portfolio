<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { flavors } from "@catppuccin/palette";
    
    import { settings, resolveFlavorName } from './state/settings.svelte';

    import Tooltip from './components/Tooltip.svelte';
    import Desktop from './components/Desktop.svelte';
    import Launcher from './components/Launcher.svelte';
    import Panel from './components/Panel.svelte';
    import LockScreen from './components/LockScreen.svelte';
    
    import { background } from './constants';
    import { lockScreen } from './state/lockScreen.svelte';
    import { wm } from './state/wm.svelte.ts';

    const flavorName = $derived(resolveFlavorName(settings.colorScheme));
    let shutdown = $state(false);

    $effect(() => {
        const flavor = flavors[flavorName] || flavors.mocha;
        const root = document.documentElement;

        for (const [name, meta] of flavor.colorEntries as [string, { hex: string }][]) {
            root.style.setProperty(`--${name}`, meta.hex);
        }
    });

    $effect(() => {
        if (document.documentElement.style.getPropertyValue('--shutdown')) {
            shutdown = true;
        }
    });
 
    // time
    let now = $state(new Date());
    const clockInterval = setInterval(() => now = new Date(), 1000);

    onMount(() => {
        // reset idle on events
        const passive = { passive: true };
        window.addEventListener("mousemove", lockScreen.resetLockTimeout);
        window.addEventListener("mousedown", lockScreen.resetLockTimeout);
        window.addEventListener("keydown", lockScreen.resetLockTimeout);
        window.addEventListener("touchstart", lockScreen.resetLockTimeout, passive);
        window.addEventListener("scroll", lockScreen.resetLockTimeout, passive);

        // start the timer
        lockScreen.resetLockTimeout();

        // start info center on load after delay
        setTimeout(() => wm.openAppById("info"), 5000);
    });

    onDestroy(() => {
        // cleanup
        clearInterval(clockInterval);
    });
</script>

{#if window.innerWidth < 768}
<div class="wrapper">
    <div class="mobile-warning">
        <h2>Init Failure</h2>
        <p>This desktop environment requires a minimum display width of 768px (Mouse & Keyboard strongly recommended).</p>
        <p>Please view on a desktop monitor to evaluate this portfolio.</p>
        <button onclick={() => { window.open("https://github.com/thetommylong", "_blank") }}>Go to GitHub instead</button>
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        padding: 48px;
        background-color: var(--mantle);
    }

    .mobile-warning {
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 16px;
        margin: 32px;
        background-color: var(--base);
        border-radius: 16px;
    }

    button {
        background-color: var(--accent);
        border: none;
        border-radius: 24px;
        padding: 1rem;
    }

    button:focus-visible {
        outline: 2px solid var(--text);
        outline-offset: 2px;
    }
</style>
{:else}

<img
    id="background"
    class:blurred={lockScreen.locked}
    src={background}
    alt="Wallpaper"
    transition:fade={{ duration: 150 * settings.animationSpeed }}/>

{#if lockScreen.locked}
<LockScreen {now} />
{/if}

{#if !lockScreen.locked}
<a href="#content" class="skip-link">Skip to content</a>
<div id="content" role="main" transition:fade={{ duration: 150 * settings.animationSpeed }}>
    <Panel {now} />
    <Launcher />
    <Desktop />
    <Tooltip />
</div>
{/if}

{#if shutdown}
<div id="shutdown-overlay" role="alert" aria-live="assertive">
    <p>System halted.</p>
</div>
{/if}
{/if}

<style>
    :global(.visually-hidden) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }

    :global(.skip-link) {
        position: absolute;
        top: -100%;
        left: 0;
        padding: 8px 16px;
        background: var(--accent);
        color: var(--text);
        z-index: 99999;
        text-decoration: none;
        font-weight: 600;
    }

    :global(.skip-link:focus) {
        top: 0;
    }

    :global(:root) {
        font-family: "Noto Sans", sans-serif;
    }

    :global(body) {
        margin: 0;
        padding: 0;
        overflow: hidden;

        --speed: 1;
    }

    @media (prefers-reduced-motion: reduce) {
        :global(*),
        :global(*::before),
        :global(*::after) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }
    
    :global(#app) {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -9999;

        --accent: var(--mauve);
        color: var(--text);
        background-color: var(--mantle);
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

    .blurred {
        filter: blur(20px);
        transform: scale(1.05);
    }

    #shutdown-overlay {
        position: fixed;
        inset: 0;
        background: #000;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        font-size: 1.2rem;
    }
</style>