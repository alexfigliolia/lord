<script lang="ts">
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import { organizations } from "$lib/state/Organization";
  import Organization from "$lib/views/organizations/+Organization.svelte";
</script>

<div class="orgs">
  <SectionTitle text="Your Organizations" />
  <div class="org-list">
    {#each $organizations as organization}
      <Organization {organization} />
    {/each}
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .orgs {
    width: 100%;
    & > .org-list {
      display: flex;
      flex-direction: column;
      gap: 20px 0;
      @media #{variables.$mq-670} {
        gap: 20px 2%;
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
</style>
