<script lang="ts">
  import PropertyOverview from "$lib/views/properties/+PropertyOverview.svelte";
  import type { Property } from "$lib/types/derived";
  import { activeProperty, properties } from "$lib/state/Properties";

  export let data: { activeProperty: Property };

  $: activeProperty.set(data.activeProperty);
</script>

<svelte:head>
  <title>{data.activeProperty.name}</title>
  <meta name="description" content={`${data.activeProperty.name} Overview`} />
</svelte:head>

<PropertyOverview name={data.activeProperty.name} />
