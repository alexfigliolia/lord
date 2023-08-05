<script lang="ts">
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import ExpenseToIncome from "./+ExpenseToIncome.svelte";
  import LinearOccupancy from "./+LinearOccupancy.svelte";
  import IssueCompletion from "./+IssueCompletion.svelte";

  export let name: string;
</script>

<SectionTitle text={name} />
<div class="property-overview">
  <div class="graph">
    <ExpenseToIncome />
  </div>
  <div class="graph">
    <LinearOccupancy />
  </div>
  <div class="graph">
    <IssueCompletion />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .property-overview {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 2%;
    & > .graph {
      width: 100%;
      margin-bottom: 20px;
      @media #{variables.$mq-957} {
        width: 49%;
      }
      @media #{variables.$mq-1350} {
        width: 32%;
      }
    }
  }
</style>
