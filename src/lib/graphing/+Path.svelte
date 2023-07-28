<script lang="ts">
  import { browser } from "$app/environment";
  import { select } from "d3";
  import { onMount } from "svelte";
  import type { Coordinate } from "./types";
  import { TaskQueue } from "@figliolia/task-queue";

  export let path: string;
  export let data: Coordinate[];
  export let fill: string = "#000";
  export let stroke: string = "#000";
  export let strokeWidth: number = 2;
  export let onMouseOut: null | ((position: MouseEvent) => void) = null;
  export let onMouseOver: null | ((position: MouseEvent) => void) = null;

  let Path: SVGPathElement;
  let active = false;

  const Queue = new TaskQueue();

  onMount(() => {
    if (browser) {
      select(Path).datum(data).attr("d", path);
    }
    Queue.deferTask(() => {
      active = true;
    }, 500);
    return () => {
      Queue.clearDeferredTasks();
    };
  });
  $: {
    if (Path) {
      select(Path).datum(data).attr("d", path).transition();
    }
  }
</script>

<path
  bind:this={Path}
  on:blur={() => {}}
  on:focus={() => {}}
  on:mouseover={onMouseOver}
  on:mousemove={onMouseOver}
  on:mouseout={onMouseOut}
  role="group"
  class="graph-path"
  class:active
  {fill}
  {stroke}
  stroke-width={strokeWidth}
  style="filter: drop-shadow(0px -2.5px 5px rgba(0, 0, 0, 0.1));" />

<style lang="scss">
  path {
    outline: none;
    transform: scaleY(0);
    transform-origin: 50% 92%;
    transition-duration: 1s;
    &.active {
      transform: scaleY(1);
    }
  }
</style>
