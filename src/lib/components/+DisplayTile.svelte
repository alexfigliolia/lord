<script lang="ts">
  import TileFull from "./+TileFull.svelte";

  export let title: string;
  export let subtitle: string;
</script>

<TileFull {title}>
  <div class="subtitle">{subtitle}</div>
  <slot />
</TileFull>

<style lang="scss">
  .subtitle {
    font-size: 1.35em;
    color: rgb(137, 122, 147);
  }
</style>
