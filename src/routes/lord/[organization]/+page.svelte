<script lang="ts">
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import Occupancy from "$lib/views/overview/+Occupancy.svelte";
  import FloatingAdd from "$lib/core-layout/+FloatingAdd.svelte";
  import OverviewGraph from "$lib/views/overview/+OverviewGraph.svelte";
  import {
    overviewOrganization,
    overviewIssues,
    overviewProperties,
    overviewUsers,
    overviewUserHash,
  } from "$lib/views/overview/Stores";
  import type { OverviewData } from "$lib/views/overview/types";

  export let data: OverviewData;

  $: {
    overviewUsers.set(data.users);
    overviewIssues.set(data.issues);
    overviewProperties.set(data.properties);
    overviewOrganization.set(data.organization);
  }
</script>

<svelte:head>
  <title>Overview</title>
  <meta name="description" content="Property Overview" />
</svelte:head>

<section id="overview">
  <OverviewGraph />
  <div class="split">
    <Issues issues={overviewIssues} users={overviewUserHash} />
    <div class="maxed">
      <Occupancy />
    </div>
  </div>
</section>
<FloatingAdd />

<style lang="scss">
  @use "$lib/variables.scss";

  #overview {
    width: 100%;
  }
  .split {
    width: 100%;
    @include variables.center;
    align-items: flex-start;
    flex-direction: column;
    @media #{variables.$mq-957} {
      flex-direction: row;
      gap: 2%;
    }
    & > .maxed {
      width: 100%;
      @media #{variables.$mq-957} {
        max-width: 400px;
      }
    }
  }
</style>
