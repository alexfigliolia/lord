<script lang="ts">
  import SectionSubTitle from "$lib/components/tiles/+SectionSubTitle.svelte";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import ExpenseToIncome from "./+ExpenseToIncome.svelte";

  export let name: string;
</script>

<div class="property-overview">
  <TileContent>
    <SectionSubTitle text="Expense to Income" />
    <div class="overview-sect">
      <ExpenseToIncome />
    </div>
  </TileContent>
</div>

<style lang="scss">
  .property-overview {
    margin-top: 20px;
    // width: 100%;
    & .overview-sect {
      margin-top: 20px;
    }
  }
</style>
