<script lang="ts">
  import {
    overviewUsers,
    overviewIssues,
    overviewProperties,
    overviewOrganization,
  } from "$lib/views/overview/Stores";
  import type { OverviewData } from "$lib/views/overview/types";

  export let data: OverviewData;

  $: overviewUsers.set(data.users);
  $: overviewIssues.set(data.issues);
  $: overviewProperties.set(data.properties);
  $: overviewOrganization.set(data.organization);
</script>

<slot />
