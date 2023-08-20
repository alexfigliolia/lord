<script lang="ts">
  import { line } from "d3";
  import LineGraph from "$lib/components/data-viz/+LineGraph.svelte";
  import type { GraphEvent } from "$lib/graphing/types";
  import Line from "$lib/components/data-viz/+Line.svelte";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";
  import SubTile from "$lib/components/tiles/+SubTile.svelte";
  import MetricTitle from "$lib/components/data-viz/+MetricTitle.svelte";
  import { DateScaling } from "$lib/graphing/DateScaling";
  import type { PropertyByID_propertyUI_units } from "$lib/schema/PropertyByID";

  export let units: PropertyByID_propertyUI_units[];

  let pathData: string | undefined;
  let percentage = "0%";

  const xData = DateScaling.last12Months();

  const onInit = ({ graph, xScale, yScale }: GraphEvent) => {
    pathData = line()
      .x(d => xScale(d[0]))
      .y(d => yScale(d[1]))(graph.datum) as string;
  };

  $: yData = xData.map(date => {
    let occupied = 0;
    units.forEach(unit => {
      for (const lease of unit.leases) {
        const { start_date, end_date } = lease;
        if (date >= parseInt(start_date) && date <= parseInt(end_date)) {
          occupied++;
          break;
        }
      }
    });
    return occupied === 0 ? 0 : (occupied / units.length) * 100;
  });

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
      <Line
        path={pathData}
        strokeWidth={5}
        stroke={percentage === "100%" || percentage === "0%" ? "#9284fc" : "url(#lineGrad)"}
      />
    {/if}
    <LinearGradient id="lineGrad" />
  </LineGraph>
</SubTile>
