<script lang="ts">
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import TeamModal from "$lib/core-layout/+TeamModal.svelte";
  import { organizations, residencies } from "$lib/state/Organization";
  import Lease from "$lib/views/organizations/+Lease.svelte";
  import Organization from "$lib/views/organizations/+Organization.svelte";
</script>

<div class="orgs">
  {#if $residencies.length}
    <SectionTitle>Your Residences</SectionTitle>
    <div class="tile-list">
      {#each $residencies as residence}
        <Lease lease={residence} />
      {/each}
    </div>
  {/if}
  {#if $organizations.length}
    <SectionTitle>Your Teams</SectionTitle>
    <div class="tile-list">
      {#each $organizations as organization}
        <Organization {organization} />
      {/each}
    </div>
  {/if}
</div>
<TeamModal />

<style lang="scss">
  @use "$lib/variables.scss";
  .orgs {
    width: 100%;
    & > .tile-list {
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
