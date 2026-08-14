<script lang="ts">
  import { onMount} from "svelte";

  import type { Repository } from "../types/repo.d.ts";
  import { tooltip } from "../state/tooltip.svelte";
  import { settings } from "../state/settings.svelte.js";
  import Icon from "../components/Icon.svelte";

  let repos: Repository[] = [];
  let selectedItem: Repository | null = null;

  onMount(async () => {
    try {
      const cachedRepos = localStorage.getItem("repos");
      const ttl = Number.parseInt(localStorage.getItem("repos_ttl") || "0", 10);
      
      if (cachedRepos && Date.now() < ttl) {
        repos = JSON.parse(localStorage.getItem("repos")!);
      } else {
      const response = await fetch("https://api.github.com/users/thetommylong/repos");
      if (!response.ok) throw new Error("Failed to fetch repositories");

      repos = await response.json();

      localStorage.setItem("repos", JSON.stringify(repos));
      localStorage.setItem("repos_ttl", (Date.now() + 24 * 60 * 60 * 1000).toString());
      }
    } catch (e) {
      console.error(e);
    } finally {
      selectedItem = repos[0];
    }
  });
</script>

<div class="nintendo-gamecube-codename">
    <div class="repos">
      {#each repos as repo}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="item" class:selected={ selectedItem?.full_name === repo.full_name }
                          onclick={() => { if (selectedItem?.full_name === repo.full_name) open(repo.html_url); selectedItem = repo; }}
                          onmouseenter={(e) => { tooltip.hover(e, repo.name, repo.description); if (!settings.doubleClickToOpen) selectedItem = repo; }}
                          onmouseleave={tooltip.leave}>
        <Icon name="folder" mode="img" class="icon"/>
        <p>{repo.name}</p>
        </div>
      {/each}
    </div>
  <div class="preview">
    <Icon name="folder" mode="img" class="icon" />
    <p>{selectedItem?.name}</p>
    <div class="metadata">
        <div class="metadata-a">Language:</div>
        <div class="metadata-b">{selectedItem?.language || "Unknown"}</div>
    </div>
    <div class="metadata">
        <div class="metadata-a">Description:</div>
        <div class="metadata-b">{selectedItem?.description}</div>
    </div>
    <div class="metadata">
        <div class="metadata-a">License:</div>
        <div class="metadata-b">{selectedItem?.license?.spdx_id || "All Rights Reserved"}</div>
    </div>
  </div>
</div>

<style>
  .nintendo-gamecube-codename {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .repos {
    padding: 16px 0 16px 8px;
    box-sizing: border-box;

    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;

    gap: 16px;

    width: 100%;
    height: 100%;
  }

  .item {
    width: 128px;
    height: 88px;

    display: flex;
    flex-direction: column;
    align-items: center;

    box-sizing: border-box;

    border: 1px solid transparent;
    border-radius: 8px;
  }

  .item:hover {
    background-color: var(--surface0);
  }

  .item.selected {
    background-color: color-mix(in srgb, var(--accent) 20%, transparent);
    border-color: var(--accent);
  }

  .item :global(.icon) {
    width: 64px;
    height: 64px;
  }

  .item p {
    width: 100%;
    text-align: center;
    font-size: 14px;

    margin: 0;
  }

  .preview {
    width: min(50%, 250px);
    height: 100%;

    background-color: var(--mantle);

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .preview :global(.icon) {
    width: 80%;
    aspect-ratio: 1;
  }

  .preview p {
    font-size: 14px;
    text-align: center;
    font-weight: 700;
     
    margin: 0 0 16px 0;

    width: 90%;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--surface0);
  }

  .metadata {
    width: 90%;
    display: flex;
    gap: 16px;
  }

  .metadata div {
    font-size: 12px;
    display: inline-block;
    flex: 1;
  }

  .metadata-a {
    text-align: right;
  }
</style>
