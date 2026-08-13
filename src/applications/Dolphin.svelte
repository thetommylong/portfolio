<script lang="ts">
  import type { Repository } from "../types/repo.d.ts";
  import { tooltip } from "../state/tooltip.svelte";
  import repos from "../../test.json";

  var selectedItem: Repository = $state(repos[0]);
</script>

<div class="nintendo-gamecube-codename">
    <div class="repos">
      {#each repos as repo}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="item" class:selected={selectedItem.full_name === repo.full_name}
                          onclick={() => { if (selectedItem.full_name === repo.full_name) open(repo.html_url); selectedItem = repo; }}
                          onmouseenter={(e) => tooltip.hover(e, repo.name, repo.description)}
                          onmouseleave={tooltip.leave}>
        <img src="/icons/folder.svg" alt="temp"/>
        <p>{repo.name}</p>
        </div>
      {/each}
    </div>
  <div class="preview">
    <img src="/icons/folder.svg" alt="temp" /> 
    <p>{selectedItem.name}</p>
    <div class="metadata">
        <div class="metadata-a">Language:</div>
        <div class="metadata-b">{selectedItem.language || "Unknown"}</div>
    </div>
    <div class="metadata">
        <div class="metadata-a">Description:</div>
        <div class="metadata-b">{selectedItem.description}</div>
    </div>
    <div class="metadata">
        <div class="metadata-a">License:</div>
        <div class="metadata-b">{selectedItem.license?.spdx_id || "All Rights Reserved"}</div>
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
    background-color: #313244;
  }

  .item.selected {
    background-color: #cba6f72e;
    border-color: #cba6f7;
  }

  .item img {
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

    background-color: #181825;

    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
  }

  .preview img {
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
    border-bottom: 1px solid #313244;
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
