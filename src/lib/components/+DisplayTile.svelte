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
  @use "$lib/variables.scss";
  .subtitle {
    font-size: 1.25em;
    color: variables.$darkgrey;
    font-weight: 700;
  }
</style>
