<script lang="ts">
  import SectionTitle from "$lib/components/tiles/+SectionTitle.svelte";
  import ExpenseToIncome from "./+ExpenseToIncome.svelte";
  import LinearOccupancy from "./+LinearOccupancy.svelte";
  import IssueCompletion from "./+IssueCompletion.svelte";
  import type { Readable } from "svelte/store";
  import type { IssueFragment } from "$lib/schema/IssueFragment";
  import type {
    PropertyByID_propertyUI_expenses,
    PropertyByID_propertyUI_payments,
    PropertyByID_propertyUI_units,
  } from "$lib/schema/PropertyByID";

  export let name: string;
  export let issues: Readable<IssueFragment[]>;
  export let units: PropertyByID_propertyUI_units[];
  export let payments: PropertyByID_propertyUI_payments[];
  export let expenses: PropertyByID_propertyUI_expenses[];
</script>

<SectionTitle>
  <div class="name">{name}</div>
  <slot />
</SectionTitle>
<div class="property-overview">
  <div class="graph">
    <ExpenseToIncome {payments} {expenses} />
  </div>
  <div class="graph">
    <LinearOccupancy {units} />
  </div>
  <div class="graph">
    <IssueCompletion {issues} />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .name {
    text-wrap: nowrap;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1;
    max-width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
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
