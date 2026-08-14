<!-- This file is heavily AI-assisted, I'm sorry. -->
<script lang="ts">
  type IconProps = {
    name: string;
    mode?: "mask" | "bg" | "img";
    class?: string;
    alt?: string;
    onclick?: Function;
  };

  let { name, mode = "mask", class: className = "", alt = "", onclick = () => {} }: IconProps = $props();

  let fullPath = $derived.by(() => {
    if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("data:")) {
      return name;
    }

    const clean = name.replace(/^\/?(icons\/)?/, "").replace(/\.svg$/, "");
    return `${import.meta.env.BASE_URL}icons/${clean}.svg`;
  });

  let urlFormat = $derived(`url("${fullPath}")`);
</script>

{#if mode === "mask"}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="icon-mask {className}" 
    style:mask-image={urlFormat}
    style:-webkit-mask-image={urlFormat}
    onclick={(e) => onclick(e)}
  ></div>
{:else if mode === "bg"}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div 
    class="icon-bg {className}" 
    style:background-image={urlFormat}
    onclick={(e) => onclick(e)}
  ></div>
{:else if mode === "img"}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <img 
    src={fullPath} 
    {alt} 
    class="icon-img {className}" 
    onclick={(e) => onclick(e)}
  />
{/if}

<style>
  .icon-mask {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    background-color: currentColor;
    mask-repeat: no-repeat;
    mask-position: center;
    mask-size: contain;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-position: center;
    -webkit-mask-size: contain;
  }

  .icon-bg {
    display: inline-block;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }

  .icon-img {
    display: inline-block;
    object-fit: contain;
  }
</style>