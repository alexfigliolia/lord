<script lang="ts">
  import SectionTitle from "./+SectionTitle.svelte";
  import TileContent from "./+TileContent.svelte";

  export let title: string;
</script>

<div class="tile">
  <SectionTitle text={title} />
  <TileContent>
    <slot />
  </TileContent>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .tile {
    width: 100%;
  }
</style>
