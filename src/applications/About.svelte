<script>
    import { user, info } from "../constants";
</script>

<svelte:head>
    <link rel="preload" href="https://github.com/{user.displayName}.png" as="image" />
</svelte:head>

<div id="container">
    <img id="profile" src="https://github.com/{user.displayName}.png" alt="user avatar" />
    <div id="info">
            <div id="user-info"><div id=user>{user.username}</div>@<div id="host">portfolio</div></div>
        {#each info as info}
            <div class="info-line">
                <span class="key">{info.label}</span>: <span class="value">{info.value}</span>
            </div>
        {/each} 
    </div>
</div>

<style>
    #container {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 100%;
        gap: 16px;

        padding: 16px;
        box-sizing: border-box;
    }

    #profile {
        min-width: 0;
        min-height: 0;
        object-fit: contain;
        object-position: top left;
    }
    
    #info {
        flex: 1;
    }

    #user-info {
        display: flex;
        flex-direction: row;
        border-bottom: 1px solid var(--text);
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
    }

    #user-info * {
        color: var(--red);
        font-weight: 700;
    }

    .info-line .key {
        color: var(--accent);
        font-weight: 700;
    }
</style>