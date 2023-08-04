<script lang="ts">
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import type { Property } from "$lib/types/derived";
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import { CurrentProperty } from "$lib/views/property/Stores";

  export let data: { activeProperty: Property };

  $: CurrentProperty.set(data.activeProperty);
</script>

<svelte:head>
  <title>{$CurrentProperty.name}</title>
  <meta name="description" content={`${$CurrentProperty.name} Overview`} />
</svelte:head>

<div>
  <PropertyOverview name={$CurrentProperty.name} />
  <Issues issues={$CurrentProperty.issues} />
</div>

<style lang="scss">
  div {
    width: 100%;
    display: block;
  }
</style>
