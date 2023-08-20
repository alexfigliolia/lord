<script lang="ts">
  import { area } from "d3";
  import moment from "moment";
  import { writable } from "svelte/store";
  import Label from "./+Label.svelte";
  import DisplayTile from "$lib/components/tiles/+DisplayTile.svelte";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import NumericStatus from "$lib/components/data-viz/+NumericStatus.svelte";
  import Area from "$lib/components/data-viz/+Area.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import { DateScaling } from "$lib/graphing/DateScaling";

  const flip = writable(false);
  const dataPoint = writable(0);
  const pointDate = writable(0);
  const prevPoint = writable(0);
  const positionX = writable(0);
  const positionY = writable(0);
  const labelActive = writable(false);

  let innerWidth: number;
  let pathData: string | undefined;
  let onMouseOut: (e: MouseEvent) => void;
  let onMouseOver: (e: MouseEvent) => void;

  const xData = DateScaling.last12Months();

  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  });

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    pathData = area()
      .x(d => xScale(d[0]))
      .y0(yScale(0))
      .y1(d => yScale(d[1]))(graph.datum) as string;
  };

  const getGraphHeight = (width: number) => {
    if (width >= 1070) {
      return 300;
    }
    if (width >= 670) {
      return 250;
    }
    return 200;
  };
</script>

<svelte:window bind:innerWidth />

<DisplayTile title="Overview" subtitle="All Properties">
  <div class="content">
    <div class="chart">
      <LineGraph
        {flip}
        {xData}
        {yData}
        {onInit}
        {dataPoint}
        {pointDate}
        {prevPoint}
        {positionX}
        {positionY}
        {labelActive}
        bind:onMouseOut
        bind:onMouseOver
        height={getGraphHeight(innerWidth)}
      >
        {#if pathData}
          <Area path={pathData} data={yData} fill="url(#areaGrad)" {onMouseOut} {onMouseOver} />
        {/if}
        <LinearGradient id="areaGrad" />
      </LineGraph>
    </div>
    <div class="mom">
      <NumericStatus
        positive
        change="3.34%"
        title="Current Month"
        value={`$${Number(yData[yData.length - 1]).toLocaleString()}`}
      />
    </div>
  </div>
</DisplayTile>
<Label {flip} {dataPoint} {pointDate} {prevPoint} {positionX} {positionY} {labelActive} />

<style lang="scss">
  .content {
    width: 100%;
    position: relative;
    & > .chart {
      width: 100%;
      margin-top: 30px;
    }
    & > .mom {
      position: absolute;
      top: calc(-30px - 1.25em);
      right: 0px;
      z-index: 2;
      border-radius: 10px;
      box-shadow: 0px 5px 10px rgba(#000, 0.2);
    }
  }
</style>
