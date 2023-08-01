<script lang="ts">
  import TileContent from "./+TileContent.svelte";

  export let margin: number = 10;
</script>

<div class="tile-list-item" style={`margin-bottom: ${margin}px`}>
  <TileContent>
    <slot name="content" />
  </TileContent>
  <slot name="actions" />
</div>

<style lang="scss">
  .tile-list-item {
    width: 100%;
    position: relative;
  }
</style>
