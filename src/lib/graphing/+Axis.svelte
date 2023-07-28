<script lang="ts">
  import { axisBottom, axisLeft, select, type AxisScale } from "d3";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let numTicks: number = 0;
  export let scale: AxisScale<any>;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let direction: "left" | "bottom";
  export let onAxisMount: (element: SVGGElement) => void = () => {};

  let reference: SVGGElement;
  const axisMethod = direction === "left" ? axisLeft : axisBottom;

  const update = () => {
    select(reference)
      .attr("transform", `translate(${translateX}, ${translateY})`)
      .call(axisMethod(scale).ticks(numTicks).tickSizeOuter(0))
      .call(g => g.selectAll(".domain").attr("stroke", "lightgray"))
      .call(g => g.selectAll("line"))
      .call(g =>
        g.selectAll("text").attr("stroke", "lightgray").attr("style", "font-weight: 100;"),
      );
  };

  onMount(() => {
    if (browser) {
      update();
      onAxisMount(reference);
    }
  });

  $: {
    if (reference) {
      update();
    }
  }
</script>

<g
  class="axis"
  bind:this={reference}
  class:left={direction === "left"}
  class:bottom={direction === "bottom"} />
