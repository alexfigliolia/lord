<script lang="ts">
  import type { PieArcDatum } from "d3";
  import { PieGraph } from "$lib/graphing/PieGraph";
  import type { PieData } from "$lib/views/properties/types";
  import ResizeObserver from "../observers/+ResizeObserver.svelte";

  export let data: PieData[];
  export let style: string = "";

  let SVG: SVGElement;
  let width: number = 150;
  let height: number = 150;

  export let graph = new PieGraph({
    data,
    dimensions: Math.min(height, width),
  });

  const onResize = (event: CustomEvent<{ width: number; height: number }>) => {
    graph = new PieGraph({
      data,
      dimensions: event.detail.height,
    });
  };

  $: if (data.length && height && width) {
    graph = new PieGraph({
      data,
      dimensions: Math.min(height, width),
    });
  }
</script>

<ResizeObserver on:resize={onResize} bind:height bind:width>
  <svg
    {style}
    {height}
    width={height}
    bind:this={SVG}
    viewBox={`${-graph.radius} ${-graph.radius} ${height} ${height}`}
  >
    <g class="sections">
      <slot name="sections" />
    </g>
    <slot name="svg" />
  </svg>
</ResizeObserver>
