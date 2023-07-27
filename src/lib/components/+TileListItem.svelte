<script lang="ts">
  import TileContent from "./+TileContent.svelte";

  export let margin: number = 10;
</script>

<div class="tile-list-item" style={`margin-bottom: ${margin}px`}>
  <TileContent>
    <slot />
  </TileContent>
</div>

<style lang="scss">
  .tile-list-item {
    width: 100%;
  }
</style>
