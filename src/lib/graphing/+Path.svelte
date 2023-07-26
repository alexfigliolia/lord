<script lang="ts">
  import { browser } from "$app/environment";
  import { select } from "d3";
  import { onMount } from "svelte";
  import type { Coordinate } from "./types";

  export let path: string;
  export let data: Coordinate[];
  export let fill: string = "#000";
  export let stroke: string = "#000";
  export let strokeWidth: number = 2;

  let Path: SVGPathElement;

  onMount(() => {
    if (browser) {
      select(Path).datum(data).attr("d", path);
    }
  });
  $: {
    if (Path) {
      select(Path).datum(data).attr("d", path).transition();
    }
  }
</script>

<path
  bind:this={Path}
  style="filter: drop-shadow(0px -2.5px 5px rgba(0, 0, 0, 0.1));"
  class="graph-path"
  {stroke}
  stroke-width={strokeWidth}
  {fill}
/>
