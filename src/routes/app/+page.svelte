<script lang="ts">
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import RevenueGraph from "$lib/views/overview/+RevenueGraph.svelte";
  import Occupancy from "$lib/views/overview/+Occupancy.svelte";
  import FloatingAdd from "$lib/core-layout/+FloatingAdd.svelte";
  import Label from "$lib/views/overview/+Label.svelte";
</script>

<svelte:head>
  <title>Overview</title>
  <meta name="description" content="Property Overview" />
</svelte:head>

<section id="overview">
  <RevenueGraph />
  <div class="split">
    <Issues />
    <div class="maxed">
      <Occupancy />
    </div>
  </div>
</section>
<FloatingAdd />
<Label />

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
