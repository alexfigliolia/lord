<script lang="ts">
  import { select, type Axis } from "d3";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let scale: Axis<any>;
  export let style: string = "";
  export let tickSize: number = 5;
  export let numTicks: number = 0;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let lineColor: string = "lightgray";
  export let tickColor: string = "transparent";

  let reference: SVGGElement;

  const update = () => {
    select(reference)
      .attr("transform", `translate(${translateX}, ${translateY})`)
      .call(scale.ticks(numTicks).tickSize(tickSize).tickSizeOuter(0))
      .call(g => g.selectAll(".tick line").attr("stroke", tickColor).attr("fill", tickColor))
      .call(g => g.selectAll(".domain").attr("stroke", lineColor))
      .call(g => {
        const text = g
          .selectAll("text")
          .attr("stroke", lineColor)
          .attr("style", `${style} font-weight: 100;`);
        // @ts-ignore
        const nodes = text._groups[0] || [];
        select(nodes[nodes.length - 1]).style("text-anchor", "end");
      });
  };

  onMount(() => {
    if (browser) {
      update();
    }
  });

  $: if (reference && !!scale) update();
</script>

<g class="axis" bind:this={reference} />
