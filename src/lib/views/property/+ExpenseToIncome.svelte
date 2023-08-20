<script lang="ts">
  import { area } from "d3";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import Area from "$lib/components/data-viz/+Area.svelte";
  import Label from "../overview/+Label.svelte";
  import { writable } from "svelte/store";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import SubTile from "$lib/components/tiles/+SubTile.svelte";
  import MetricTitle from "$lib/components/data-viz/+MetricTitle.svelte";
  import type {
    PropertyByID_propertyUI_expenses,
    PropertyByID_propertyUI_payments,
  } from "$lib/schema/PropertyByID";
  import { DataPointAggregator } from "./DataPointAggregator";
  import { DateScaling } from "$lib/graphing/DateScaling";

  export let payments: PropertyByID_propertyUI_payments[];
  export let expenses: PropertyByID_propertyUI_expenses[];

  let toggled = false;
  let paymentList: number[] = [];
  let expenseList: number[] = [];
  let paymentLine: string | undefined;
  let expenseLine: string | undefined;
  let onMouseOut: (e: MouseEvent) => void;
  let onMouseOver: (e: MouseEvent) => void;

  const flip = writable(false);
  const dataPoint = writable(0);
  const pointDate = writable(0);
  const prevPoint = writable(0);
  const positionX = writable(0);
  const positionY = writable(0);
  const labelActive = writable(false);
  let paymentMap = new DataPointAggregator(payments);
  let expenseMap = new DataPointAggregator(expenses);

  const xData = DateScaling.last12Months();
  let yData = xData.map(d => {
    const month = new Date(d).getMonth();
    // @ts-ignore
    return Math.max(paymentMap.table[month], expenseMap.table[month]);
  });

  const onInit = ({ xScale, yScale }: GraphEvent) => {
    expenseList = [];
    paymentList = [];
    expenseLine = area()
      .x(d => xScale(d[0]))
      .y0(yScale(0))
      .y1(d => yScale(d[1]))(
      xData.map((d, i) => {
        const month = new Date(d).getMonth();
        // @ts-ignore
        const total = expenseMap.table[month];
        expenseList[i] = total;
        return [d, total];
      }),
    ) as string;
    paymentLine = area()
      .x(d => xScale(d[0]))
      .y0(yScale(0))
      .y1(d => yScale(d[1]))(
      xData.map((d, i) => {
        const month = new Date(d).getMonth();
        // @ts-ignore
        const total = paymentMap.table[month];
        paymentList[i] = total;
        return [d, total];
      }),
    ) as string;
    toggled = !toggled;
  };

  const netIncome = (
    payments: PropertyByID_propertyUI_payments[],
    expenses: PropertyByID_propertyUI_expenses[],
  ) => {
    const revenue = payments.reduce((acc, next) => acc + next.amount, 0);
    const expense = expenses.reduce((acc, next) => acc + next.amount, 0);
    return revenue - expense;
  };

  $: paymentMap = new DataPointAggregator(payments);
  $: expenseMap = new DataPointAggregator(expenses);
  $: yData = xData.map(d => {
    const month = new Date(d).getMonth();
    // @ts-ignore
    return Math.max(paymentMap.table[month], expenseMap.table[month]);
  });
</script>

<SubTile title="Expense to Income">
  <MetricTitle
    slot="title"
    label="Yearly Net Income"
    value={`$${Number(netIncome(payments, expenses)).toLocaleString()}`}
  />
  <LineGraph
    slot="content"
    {xData}
    {yData}
    {flip}
    {onInit}
    {dataPoint}
    {pointDate}
    {prevPoint}
    {positionX}
    {positionY}
    {labelActive}
    bind:onMouseOut
    bind:onMouseOver
  >
    {#if expenseLine && paymentLine}
      {#key toggled}
        <Area
          {onMouseOut}
          {onMouseOver}
          path={paymentLine}
          data={paymentList}
          fill="url(#areaGrad)"
          style="filter: drop-shadow(0px -2.5px 2.5px #9284fc4a);"
        />
        <Area
          {onMouseOut}
          {onMouseOver}
          path={expenseLine}
          data={expenseList}
          fill="rgb(250, 60, 60)"
        />
      {/key}
    {/if}
    <LinearGradient id="areaGrad" />
  </LineGraph>
</SubTile>
<Label {flip} {dataPoint} {pointDate} {prevPoint} {positionX} {positionY} {labelActive} />
