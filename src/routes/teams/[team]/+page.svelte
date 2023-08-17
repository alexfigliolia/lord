<script lang="ts">
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import FloatingAdd from "$lib/core-layout/+FloatingAdd.svelte";
  import {
    overviewOrganization,
    overviewIssues,
    overviewProperties,
    overviewUsers,
    overviewUserHash,
  } from "$lib/views/overview/Stores";
  import type { OverviewData } from "$lib/views/overview/types";
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import AdminAddModal from "$lib/core-layout/+AdminAddModal.svelte";
  import PropertiesButton from "$lib/views/overview/+PropertiesButton.svelte";

  export let data: OverviewData;

  $: overviewUsers.set(data.users);
  $: overviewIssues.set(data.issues);
  $: overviewProperties.set(data.properties);
  $: overviewOrganization.set(data.organization);
</script>

<svelte:head>
  <title>Overview</title>
  <meta name="description" content="Property Overview" />
</svelte:head>

<div>
  <PropertyOverview name={$overviewOrganization.name} issues={overviewIssues}>
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
