<script>
    import { onDestroy } from "svelte";
    import { fade } from "svelte/transition";
    import { lockScreen } from "../state/lockScreen.svelte";
    import { user } from "../constants";
  import Icon from "./Icon.svelte";

    let { now } = $props();

    onDestroy(() => {
        lockScreen.destroy();
    })
</script>

<div id="lock-screen" transition:fade={{ duration: 150 }}>
    <div id="datetime">
        <div id="time">{now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit"})}</div>
        <div id="date">{now.toLocaleDateString([], { dateStyle: "full" })}</div>
    </div>
    <div id="login">
        <div id="user">
            <div id="icon" style:background=url({user.avatarUrl})></div>
        </div>
        <div id="name">{user.displayName}</div>
        <div id="username">{user.username}</div>
        <div id="input">
            <input type="password" onkeydown={(e) => {if (e.key === "Enter") lockScreen.locked = false;}} />
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <div id="button" onclick={() => { lockScreen.locked = false; }} >
                <!-- svelte-ignore a11y_click_events_have_key_events -->
                <!-- svelte-ignore a11y_no_static_element_interactions -->
                <Icon class="submit" name="system-log-in-symbolic" />
            </div>
        </div>
        <div id="actions">
            <!-- The following button does nothing. -->
            <!-- I am not making another lock screen to replicate SDDM-->
            <div class="action"><Icon class="icon action-icon" name="system-switch-user-symbolic" />Switch User</div>
        </div>
    </div>
</div>

<style>
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
        background-repeat: no-repeat !important;
        background-position: center !important;
        background-size: contain !important;
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

    #lock-screen #login #input :global(#submit) {
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
    
    #actions {
        margin-top: 24px;
    }

    .action {
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 4px;
    }

    .action:hover {
        color: var(--accent);
    }

    .action:hover :global(.icon) {
        background-color: var(--accent);
    }
    
    #lock-screen :global(.icon) {
        background-color: var(--text);
        mask-repeat: no-repeat !important;
        mask-position: center !important;
        mask-size: contain !important;
    }
    
    #lock-screen :global(.action-icon) {
        width: 64px;
        height: 64px;
        border-radius: 50%;
    }
</style>