<script lang="ts">
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import FloatingAdd from "$lib/core-layout/+FloatingAdd.svelte";
  import {
    overviewUnits,
    overviewIssues,
    overviewPayments,
    overviewExpenses,
    overviewUserHash,
    overviewOrganization,
  } from "$lib/views/overview/Stores";
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import AdminAddModal from "$lib/core-layout/+AdminAddModal.svelte";
  import PropertiesButton from "$lib/views/overview/+PropertiesButton.svelte";
</script>

<svelte:head>
  <title>Overview</title>
  <meta name="description" content="Property Overview" />
</svelte:head>

<div>
  <PropertyOverview
    name={$overviewOrganization.name}
    issues={overviewIssues}
    payments={$overviewPayments}
    expenses={$overviewExpenses}
    units={$overviewUnits}
  >
    <PropertiesButton />
  </PropertyOverview>
  <Issues issues={overviewIssues} users={overviewUserHash} />
</div>
<FloatingAdd />
<AdminAddModal />

<style lang="scss">
  div {
    display: block;
    width: 100%;
  }
</style>
