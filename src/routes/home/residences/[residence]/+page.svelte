<script lang="ts">
  import { derived } from "svelte/store";
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import LeaseProgress from "$lib/views/residence/+LeaseProgress.svelte";
  import Payments from "$lib/views/residence/+Payments.svelte";
  import ResidenceAddModal from "$lib/views/residence/+ResidenceAddModal.svelte";
  import { paymentMethods, residence } from "$lib/views/residence/Stores";
  import type { ResidenceData } from "$lib/views/residence/types";

  export let data: ResidenceData;

  $: residence.set(data.residence);
  $: paymentMethods.set(data.payment_methods);

  const name = derived(residence, v => {
    if (!v) {
      return "";
    }
    return `${v.property.name} - ${v.unit.name}`;
  });
</script>

<div class="residence">
  <SectionTitle>{$name}</SectionTitle>
  <div class="content">
    <div class="tile">
      <Payments />
    </div>
    <div class="tile">
      <LeaseProgress />
    </div>
  </div>
</div>
<ResidenceAddModal />

<style lang="scss">
  @use "$lib/variables.scss";
  .residence {
    width: 100%;
    & > .content {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0% 2.5%;
      @media #{variables.$mq-1450} {
        gap: 0% 1.5%;
      }
      & > .tile {
        width: 100%;
        margin-bottom: 20px;
        @media #{variables.$mq-670} {
          width: 48.5%;
        }
        @media #{variables.$mq-1450} {
          width: 32.3%;
        }
        & .sub-title {
          color: gray;
          font-size: 0.9em;
          margin-top: 0.2em;
          font-weight: 300;
        }
      }
    }
  }
</style>
