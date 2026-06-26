<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { flavors } from "@catppuccin/palette";
    
    import Tooltip from './components/Tooltip.svelte';
    import Desktop from './components/Desktop.svelte';
    import Launcher from './components/Launcher.svelte';
    import Panel from './components/Panel.svelte';
    
    import { background, user } from './constants';

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
    src={unlocked ? background.normal : background.blurred}
    alt="Wallpaper"
    transition:fade={{ duration: 150 }}/>

{#if !unlocked}
<div id="lock-screen" transition:fade={{ duration: 150 }}>
    <div id="datetime">
        <div id="time">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}</div>
        <div id="date">{now.toLocaleDateString([], { dateStyle: "full" })}</div>
    </div>
    <div id="login">
        <div id="user">
            <div id="icon" style:mask=url(/icons/avatar-default-symbolic.svg)></div>
        </div>
        <div id="name">{user.displayName}</div>
        <div id="username">{user.username}</div>
        <div id="input">
            <input type="password" onkeydown={(e) => {if (e.key === "Enter") unlocked = true;}} />
            <div id="button">
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <div id="submit" style:mask=url(/icons/system-log-in-symbolic.svg) onclick={() => {unlocked = true}}></div>
            </div>
        </div>
    </div>
</div>
{/if}

{#if unlocked}
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
 
    #lock-screen {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding-top: 4rem;
    }

    #lock-screen #datetime #time {
        font-size: 6rem;
        text-align: center;
        font-weight: 700;
    }
    
    #lock-screen #datetime #date {
        font-size: 2rem;
        text-align: center;
    }

    #lock-screen #login {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #lock-screen #login #user {
        margin-top: 4rem;
        position: relative;
        height: 8rem;
        width: 8rem;
        background-color: var(--surface0);
        border-radius: 50%;
        overflow: hidden;
        box-shadow: 0 0 0 4px var(--text);
    }

    #lock-screen #login #user #icon {
        height: 100%;
        width: 100%;
        margin-top: 1.5rem;
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
    }

    #lock-screen #login #name {
        margin-top: 1rem;
        font-weight: 600;
        font-size: 1.3rem;
    }

    #lock-screen #login #username {
        font-size: 1rem;
        font-weight: 500;
        color: var(--subtext0)
    }

    #lock-screen #login #input {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        gap: 8px;
    }

    #lock-screen #login #button {
        background-color: var(--surface1);
        height: 1.5rem;
        width: 1.5rem;
        border: 5px solid transparent;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #lock-screen #login #input #submit {
        height: 100%;
        width: 100%;
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
    }

    #lock-screen #login #input input {
        height: 1.5rem;
        width: 14rem;
        background-color: var(--surface0);
        border: 4px solid transparent;
        border-radius: 4px;
        color: var(--text);
    }

    #lock-screen #login input:focus {
        outline: 4px solid var(--accent);
    }
</style>