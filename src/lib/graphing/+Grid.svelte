<script lang="ts">
  import { axisBottom, axisLeft, select, type AxisScale } from "d3";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let size: number;
  export let numTicks: number = 0;
  export let thickness: number = 1;
  export let color: string = "#000";
  export let scale: AxisScale<any>;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let direction: "left" | "bottom";
  export let onGridMount: (element: SVGGElement) => void = () => {};

  let reference: SVGGElement;
  const axisMethod = direction === "left" ? axisLeft : axisBottom;

  const update = () => {
    select(reference)
      .attr("class", `grid ${direction}`)
      .attr("transform", `translate(${translateX}, ${translateY})`)
      // @ts-ignore
      .call(axisMethod(scale).ticks(numTicks).tickSize(size).tickFormat(""))
      .call(g => g.selectAll("line").attr("stroke", color).attr("stroke-width", thickness))
      .call(g => g.select(".domain").attr("stroke", color).attr("stroke-width", thickness));
  };

  onMount(() => {
    if (browser) {
      update();
      onGridMount(reference);
    }
  });

  $: {
    if (reference) {
      update();
    }
  }
</script>

<g
  class="grid"
  bind:this={reference}
  class:left={direction === "left"}
  class:bottom={direction === "bottom"} />
