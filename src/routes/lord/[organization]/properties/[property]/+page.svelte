<script lang="ts">
  import PropertyOverview from "$lib/views/property/+PropertyOverview.svelte";
  import type { Property, User } from "$lib/types/derived";
  import Issues from "$lib/views/overview/Issues/+Issues.svelte";
  import { issues, property } from "$lib/views/property/Stores";
  import { overviewUserHash, overviewUsers } from "$lib/views/overview/Stores";

  export let data: { property: Property; users: User[] };

  $: {
    property.set(data.property);
    overviewUsers.set(data.users);
    issues.set(data.property.issues || []);
  }
</script>

<svelte:head>
  <title>{$property?.name || ""}</title>
  <meta name="description" content={`${$property?.name || ""} Overview`} />
</svelte:head>

<div>
  <PropertyOverview name={$property?.name || ""} />
  <Issues {issues} users={overviewUserHash} />
</div>

<style lang="scss">
  div {
    width: 100%;
    display: block;
  }
</style>
