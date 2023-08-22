<script lang="ts">
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import AdminAddModal from "$lib/core-layout/+AdminAddModal.svelte";
  import Building from "$lib/icons/+Building.svelte";
  import { addModalOpen, tab } from "$lib/state/Add";
  import { overviewProperties } from "$lib/views/overview/Stores";
  import PropertySnapshot from "$lib/views/properties/+PropertySnapshot.svelte";

  class UIController {
    public static openAdd = () => {
      addModalOpen.set(true);
      tab.set(0);
    };
  }
</script>

<svelte:head>
  <title>Properties</title>
  <meta name="description" content="All Properties" />
</svelte:head>

<section id="properties">
  {#each $overviewProperties as property}
    <PropertySnapshot {property} />
  {/each}

  {#if $overviewProperties.length === 0}
    <div class="none">
      <TileContent>
        <button class="add" on:click={UIController.openAdd}>
          <div class="icon">
            <Building color="#fff" />
          </div>
          Add your first Property
        </button>
      </TileContent>
    </div>
  {/if}
</section>
<AdminAddModal />

<style lang="scss">
  @use "$lib/variables.scss";
  #properties {
    width: 100%;
    @include variables.center;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2%;
    & > .none {
      width: 100%;
      margin-top: 20px;
      outline: none;
      border: none;
      padding: 0;
      @media #{variables.$mq-670} {
        width: 49%;
      }
      @media #{variables.$mq-1350} {
        width: 32%;
      }
      & .add {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        margin: 0;
        padding: 0;
        background: linear-gradient(to bottom, variables.$core, variables.$core2);
        height: 100px;
        color: #fff;
        font-size: 1.25em;
        font-style: italic;
        @include variables.center;
        & > .icon {
          height: 1.75em;
          width: 1.75em;
          margin-right: 10px;
        }
      }
    }
  }
</style>
