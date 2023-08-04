<script lang="ts">
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import type { Property } from "$lib/types/derived";
  import { activeProperty } from "$lib/state/Properties";
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";

  export let data: { activeProperty: Property };

  $: activeProperty.set(data.activeProperty);
</script>

<svelte:head>
  <title>{data.activeProperty.name}</title>
  <meta name="description" content={`${data.activeProperty.name} Overview`} />
</svelte:head>

<div>
  <PropertyOverview name={data.activeProperty.name} />
  <Issues issues={$activeProperty.issues} />
</div>

<style lang="scss">
  div {
    width: 100%;
    display: block;
  }
</style>
