<script lang="ts">
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import { units, issues, property, payments, expenses } from "$lib/views/property/Stores";
  import { overviewUserHash } from "$lib/views/overview/Stores";
  import type { PropertyByID_propertyUI } from "$lib/schema/PropertyByID";
  import PropertyAddModal from "$lib/views/property/+PropertyAddModal.svelte";

  export let data: {
    activeProperty: PropertyByID_propertyUI;
  };

  console.log("DATA", data);

  $: {
    property.set(data.activeProperty);
    units.set(data.activeProperty.units || []);
    issues.set(data.activeProperty.issues || []);
    payments.set(data.activeProperty.payments || []);
    expenses.set(data.activeProperty.expenses || []);
  }
</script>

<svelte:head>
  <title>{$property?.name || ""}</title>
  <meta name="description" content={`${$property?.name || ""} Overview`} />
</svelte:head>

<div>
  <PropertyOverview
    {issues}
    units={$units}
    payments={$payments}
    expenses={$expenses}
    name={$property?.name || ""}
  />
  <Issues {issues} users={overviewUserHash} />
</div>
<PropertyAddModal />

<style lang="scss">
  div {
    width: 100%;
    display: block;
  }
</style>
