<script lang="ts">
  import { settings } from "../state/settings.svelte";
    import { colorScheme } from "../types/settings";

    let theme = $state<colorScheme>(colorScheme.Automatic);
    let files = $state<FileList>();
    let animationSpeed = $state<number>(1);

    const themeOptions = [
        { id: colorScheme.CatppuccinLatte, label: "Catppuccin Latte", img: "/misc/latte.jpg" },
        { id: colorScheme.CatppuccinMocha, label: "Catppuccin Mocha", img: "/misc/mocha.jpg" },
        { id: colorScheme.Automatic, label: "Automatic", img: "/misc/auto.jpg" }
    ];
</script>

<div class="container">
    <div class="themes">
        {#each themeOptions as item}
            <!-- svelte-ignore a11y_no_static_element_interactions -->
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="theme" onclick={() => theme = item.id}>
                <img 
                    src={item.img} 
                    alt={item.label} 
                    class:active={theme === item.id}
                >
                <p>{item.label}</p>
            </div>
        {/each}
    </div>

    <div class="options animation-speed">
        <label for="speed-slider">Animation speed: {animationSpeed}x</label>
        <input 
            id="speed-slider"
            type="range" 
            min="0.25" 
            max="2" 
            step="0.25" 
            bind:value={animationSpeed}
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
    
    <button class="apply-button" onclick={() => settings.saveSettings()}>Apply</button>
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
        border: 8px solid #cba6f72e;
    }

    .theme img.active { 
        border: 8px solid #cba6f7;
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
        background-color: #313244;
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
        background-color: #313244;
        border-radius: 0.5rem;
        height: 8px;
    }

    .animation-speed #speed-slider::-moz-range-track {
        background-color: #313244;
        border-radius: 0.5rem;
        height: 8px;
    }

    .animation-speed #speed-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        
        margin-top: -4px;
        
        background-color: #cba6f7;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        transition: transform 0.1s ease, background-color 0.1s ease;
    }

    .animation-speed #speed-slider::-moz-range-thumb {
        border: none;
        background-color: #cba6f7;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        transition: transform 0.1s ease, background-color 0.1s ease;
    }

    .animation-speed #speed-slider::-webkit-slider-thumb:hover,
    .animation-speed #speed-slider::-moz-range-thumb:hover {
        transform: scale(1.15);
        background-color: #f5c2e7;
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
        accent-color: #cba6f7;
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
        color: #a6adc8;
    }

    button {
        background-color: #cba6f7;
        color: #1e1e2e;

        border-radius: 2rem;
        outline: none;
        border: none;

        padding: 6px 12px;
        cursor: pointer;

        position: absolute;
        bottom: 8px;
        right: 8px;
    }
</style>