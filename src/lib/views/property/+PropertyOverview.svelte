<script lang="ts">
  import SectionSubTitle from "$lib/components/tiles/+SectionSubTitle.svelte";
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import TileContent from "$lib/components/tiles/+TileContent.svelte";
  import ExpenseToIncome from "./+ExpenseToIncome.svelte";
  import LinearOccupancy from "./+LinearOccupancy.svelte";
  import IssueCompletion from "./+IssueCompletion.svelte";

  export let name: string;
</script>

<SectionTitle text={name} />
<div class="property-overview">
  <div class="graph">
    <TileContent>
      <SectionSubTitle text="Expense to Income" />
      <div class="overview-sect">
        <ExpenseToIncome />
      </div>
    </TileContent>
  </div>
  <div class="graph">
    <TileContent>
      <SectionSubTitle text="Occupancy Percentage" />
      <div class="overview-sect">
        <LinearOccupancy />
      </div>
    </TileContent>
  </div>
  <div class="graph">
    <TileContent>
      <SectionSubTitle text="Issue Completion" />
      <div class="overview-sect">
        <IssueCompletion />
      </div>
    </TileContent>
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
      & .overview-sect {
        margin-top: 20px;
        height: 200px;
      }
    }
  }
</style>
