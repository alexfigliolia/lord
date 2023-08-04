<script lang="ts">
  import { area } from "d3";
  import moment from "moment";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import type { GraphEvent } from "./types";
  import Area from "$lib/components/data-viz/+Area.svelte";
  import Label from "../overview/+Label.svelte";
  import { writable } from "svelte/store";
  import LinearGradient from "$lib/components/+LinearGradient.svelte";

  let incomeLine: string | undefined;
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

  const xData = new Array(12).fill("").map((_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    date.hours(0);
    return date.toDate().getTime();
  });
  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  });

  const expenses: [number, number][] = xData.map(x => {
    return [x, Math.floor(Math.random() * (6000 - 2000) + 2000)];
  });

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    expenseLine = area()
      .x(d => xScale(d[0]))
      .y0(yScale(0))
      .y1(d => yScale(d[1]))(expenses) as string;
    incomeLine = area()
      .x(d => xScale(d[0]))
      .y0(yScale(0))
      .y1(d => yScale(d[1]))(graph.datum) as string;
  };
</script>

<LineGraph
  {xData}
  {yData}
  {onInit}
  {flip}
  {dataPoint}
  {pointDate}
  {prevPoint}
  {positionX}
  {positionY}
  {labelActive}
  bind:onMouseOut
  bind:onMouseOver
>
  {#if expenseLine && incomeLine}
    <Area
      data={yData}
      {onMouseOut}
      {onMouseOver}
      path={incomeLine}
      fill="url(#lineGrad)"
      style="filter: drop-shadow(0px -2.5px 2.5px #9284fc4a);"
    />
    <Area
      {onMouseOut}
      {onMouseOver}
      path={expenseLine}
      fill="rgb(250, 60, 60)"
      data={expenses.map(d => d[1])}
    />
  {/if}
  <LinearGradient id="lineGrad" />
</LineGraph>
<Label {flip} {dataPoint} {pointDate} {prevPoint} {positionX} {positionY} {labelActive} />
