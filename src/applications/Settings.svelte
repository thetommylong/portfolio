<script lang="ts">
    import { settings } from "../state/settings.svelte";
    import { colorScheme } from "../types/settings";

    import latte from "/misc/latte.jpg?url"
    import mocha from "/misc/mocha.jpg?url"
    import auto from "/misc/auto.jpg?url"

    let files = $state<FileList>();
    $effect(() => {
        if (files?.[0].name) settings.setWallpaper(files?.[0] ?? null);
    });

    const themeOptions = [
        { id: colorScheme.CatppuccinLatte, label: "Catppuccin Latte", img: latte },
        { id: colorScheme.CatppuccinMocha, label: "Catppuccin Mocha", img: mocha },
        { id: colorScheme.Automatic, label: "Automatic", img: auto }
    ];
</script>

<div class="container">
    <div class="themes">
        {#each themeOptions as item}
            <div class="theme" 
                 role="button"
                 tabindex="0"
                 aria-label={`Select ${item.label} theme`}
                 aria-pressed={settings.colorScheme === item.id}
                 onclick={() => settings.colorScheme = item.id}
                 onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); settings.colorScheme = item.id; } }}>
                <img 
                    src={item.img} 
                    alt={item.label} 
                    class:active={settings.colorScheme === item.id}
                >
                <p>{item.label}</p>
            </div>
        {/each}
    </div>

    <div class="options animation-speed">
        <label for="speed-slider">Animation scale: {settings.animationSpeed == 0 ? "Instant" : `${settings.animationSpeed}x`}</label>
        <input 
            id="speed-slider"
            type="range" 
            min="0" 
            max="2" 
            step="0.25" 
            bind:value={settings.animationSpeed}
        >
    </div>

    <div class="options maniac">
        <p class="setting-title">Clicking files or folders</p>
        <label class="radio-option">
            <input 
                type="radio" 
                name="click-mode" 
                bind:group={settings.doubleClickToOpen}
                value={true}
            >
            <div class="option-text">
                <span class="option-label">Selects them</span>
                <span class="option-desc">Open by double-clicking instead</span>
            </div>
        </label>

        <label class="radio-option">
            <input 
                type="radio" 
                name="click-mode" 
                bind:group={settings.doubleClickToOpen}
                value={false}
            >
            <div class="option-text">
                <span class="option-label">Opens them</span>
                <span class="option-desc">You can't select while in this mode, I'm not torturing myself with this</span>
            </div>
        </label>
    </div>

    <div class="wallpaper">
        <label for="wallpaper-selector" class="selector-button">
            {files?.[0]?.name || "Click to choose & change wallpaper"}
        </label>
        <input bind:files accept="image/*" type="file" id="wallpaper-selector">
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: flex-start;

        width: 100%;
        height: 100%;
    }

    .options {
        width: 80%;
        max-width: 500px;
        margin: 8px 0;
    }

    .themes {
        display: flex;
        gap: 32px;
        margin: 16px 64px;
    }

    .theme {
        display: flex;
        flex-direction: column;
        flex: 1;

        box-sizing: border-box;
    }

    .theme img {
        width: 100%;
        border: 8px solid transparent;
        border-radius: 8px;
    }

    .theme:hover img {
        border: 8px solid color-mix(in srgb, var(--accent) 20%, transparent);
    }

    .theme img.active { 
        border: 8px solid var(--accent);
    }

    .theme p {
        width: 100%;
        text-align: center;

        margin: 8px 0 0 0;
    }

    input[type="file"] {
        display: none;
    }

    .selector-button {
        background-color: var(--surface0);
        padding: 6px 12px;
        border-radius: 0.5rem;
        cursor: pointer;
        font-size: 14px;
    }

    .animation-speed {
        display: flex;
        flex-direction: column;
        justify-content: center;

        margin-top: 20px;
    }

    .animation-speed label {
        width: 40%;
    }
 
    .animation-speed #speed-slider {
        flex: 1;
    }

    .animation-speed #speed-slider {
        -webkit-appearance: none;
        appearance: none;
        background: transparent;
        cursor: pointer;
        width: 100%;
    }

    .animation-speed #speed-slider:focus {
        outline: none;
    }

    .animation-speed #speed-slider::-webkit-slider-runnable-track {
        background-color: var(--surface0);
        border-radius: 0.5rem;
        height: 8px;
    }

    .animation-speed #speed-slider::-moz-range-track {
        background-color: var(--surface0);
        border-radius: 0.5rem;
        height: 8px;
    }

    .animation-speed #speed-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        
        margin-top: -4px;
        
        background-color: var(--accent);
        height: 16px;
        width: 16px;
        border-radius: 50%;
        transition: transform calc(0.1s * var(--speed)) ease, background-color calc(0.1s * var(--speed)) ease;
    }

    .animation-speed #speed-slider::-moz-range-thumb {
        border: none;
        background-color: var(--accent);
        height: 16px;
        width: 16px;
        border-radius: 50%;
        transition: transform calc(0.1s * var(--speed)) ease, background-color calc(0.1s * var(--speed)) ease;
    }

    .animation-speed #speed-slider::-webkit-slider-thumb:hover,
    .animation-speed #speed-slider::-moz-range-thumb:hover {
        transform: scale(1.15);
        background-color: color-mix(in srgb, var(--accent) 20%, white);
    }

    .animation-speed #speed-slider:active::-webkit-slider-thumb,
    .animation-speed #speed-slider:active::-moz-range-thumb {
        transform: scale(0.95);
    }

    .setting-title {
        font-weight: 600;
        margin: 0 0 4px 0;
    }

    .maniac .radio-option {
        margin: 8px 0;
    }

    .radio-option {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        cursor: pointer;
    }

    .radio-option input[type="radio"] {
        accent-color: var(--accent);
        margin-top: 3px;
        cursor: pointer;
    }

    .option-text {
        display: flex;
        flex-direction: column;
    }

    .option-label {
        font-size: 14px;
        font-weight: 500;
    }

    .option-desc {
        font-size: 12px;
        color: var(--subtext0);
    }
</style>