<script lang="ts">
  import Issues from "$lib/overview/+Issues.svelte";
  import RevenueGraph from "$lib/overview/+RevenueGraph.svelte";
  import Occupancy from "$lib/overview/+Occupancy.svelte";
  import Label from "$lib/overview/+Label.svelte";
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
