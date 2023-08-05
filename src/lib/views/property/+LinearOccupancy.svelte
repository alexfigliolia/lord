<script lang="ts">
  import { line } from "d3";
  import moment from "moment";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import Line from "$lib/components/data-viz/+Line.svelte";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import SubTile from "$lib/components/tiles/+SubTile.svelte";
  import MetricTitle from "$lib/components/data-viz/+MetricTitle.svelte";

  let pathData: string | undefined;
  let percentage = "0%";

  const xData = new Array(12).fill("").map((_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    date.hours(0);
    return date.toDate().getTime();
  });
  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (100 - 50) + 50);
  });

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    pathData = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))(graph.datum) as string;
  };

  $: {
    if (!yData.length) {
      percentage = "100%";
    } else {
      percentage = `${Math.round(yData.reduce((acc, next) => acc + next, 0) / yData.length)}%`;
    }
  }
</script>

<SubTile title="Occupancy Percentage">
  <MetricTitle slot="title" label="Yearly Occupancy" value={percentage} />
  <LineGraph slot="content" {xData} {yData} {onInit}>
    {#if pathData}
      <Line path={pathData} stroke="url(#lineGrad)" strokeWidth={5} />
    {/if}
    <LinearGradient id="lineGrad" />
  </LineGraph>
</SubTile>
