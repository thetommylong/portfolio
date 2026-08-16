<script lang="ts">
    import "@xterm/xterm/css/xterm.css"; 
    import { terminal } from "../state/bash.svelte";
</script>

<div use:terminal class="container"></div>

<style>
    .container {
        width: 100%;
        height: calc(100% - 34px);
        
        position: absolute;
        bottom: 0;
    }
</style>