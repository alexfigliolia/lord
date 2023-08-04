<script lang="ts">
  import { select, type Axis } from "d3";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";

  export let scale: Axis<any>;
  export let tickSize: number = 5;
  export let numTicks: number = 0;
  export let thickness: number = 1;
  export let translateX: number = 0;
  export let translateY: number = 0;
  export let color: string = "lightgrey";

  let reference: SVGGElement;

  const update = () => {
    select(reference)
      .attr("transform", `translate(${translateX}, ${translateY})`)
      // @ts-ignore
      .call(scale.ticks(numTicks).tickSize(tickSize).tickFormat(""))
      .call(g => g.selectAll("line").attr("stroke", color).attr("stroke-width", thickness))
      .call(g => g.select(".domain").attr("stroke", color).attr("stroke-width", thickness));
  };

  onMount(() => {
    if (browser) {
      update();
    }
  });

  $: if (reference && !!scale) update();
</script>

<g class="grid" bind:this={reference} />
