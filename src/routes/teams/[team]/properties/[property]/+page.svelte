<script lang="ts">
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import { units, issues, property } from "$lib/views/property/Stores";
  import { overviewUserHash } from "$lib/views/overview/Stores";
  import type { PropertyByID_property } from "$lib/schema/PropertyByID";
  import PropertyAddModal from "$lib/views/property/+PropertyAddModal.svelte";

  export let data: { property: PropertyByID_property };

  $: {
    property.set(data.property);
    units.set(data.property.units || []);
    issues.set(data.property.issues || []);
  }
</script>

<svelte:head>
  <title>{$property?.name || ""}</title>
  <meta name="description" content={`${$property?.name || ""} Overview`} />
</svelte:head>

<div>
  <PropertyOverview name={$property?.name || ""} {issues} />
  <Issues {issues} users={overviewUserHash} />
</div>
<PropertyAddModal />

<style lang="scss">
  div {
    width: 100%;
    display: block;
  }
</style>
