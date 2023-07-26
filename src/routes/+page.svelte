<script lang="ts">
  import RevenueGraph from "$lib/overview/+RevenueGraph.svelte";
</script>

<svelte:head>
  <title>Overview</title>
  <meta name="description" content="Property Overview" />
</svelte:head>

<section id="overview">
  <RevenueGraph />
</section>

<style lang="scss">
  #overview {
    width: 100%;
  }
</style>
