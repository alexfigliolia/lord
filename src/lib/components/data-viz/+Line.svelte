<script lang="ts">
  import { browser } from "$app/environment";
  import { select } from "d3";
  import { onMount } from "svelte";
  import { TaskQueue } from "@figliolia/task-queue";

  export let path: string;
  export let strokeWidth: number = 2;
  export let stroke: string = "#9284fc";
  export let fill: string = "transparent";
  export let shadowColor: string = "#9284fc";
  export let onMouseOut: null | ((position: MouseEvent) => void) = null;
  export let onMouseOver: null | ((position: MouseEvent) => void) = null;

  let Path: SVGPathElement;
  let totalLength = 0;
  let activeLength = 0;
  let active = false;

  const Queue = new TaskQueue();

  onMount(() => {
    if (browser) {
      select(Path).attr("d", path);
      totalLength = Path.getTotalLength();
      activeLength = totalLength;
    }
    Queue.deferTask(() => {
      active = true;
      activeLength = 0;
    }, 500);
    return () => {
      Queue.clearDeferredTasks();
    };
  });

  $: if (Path && path) select(Path).attr("d", path);
</script>

<path
  {fill}
  {stroke}
  bind:this={Path}
  role="group"
  class="graph-path"
  class:active
  on:blur={() => {}}
  on:focus={() => {}}
  on:mouseout={onMouseOut}
  on:mouseover={onMouseOver}
  on:mousemove={onMouseOver}
  stroke-width={strokeWidth}
  stroke-dasharray={totalLength}
  stroke-dashoffset={activeLength}
  style={`filter: drop-shadow(0px 10px 10px ${shadowColor});`}
/>

<style lang="scss">
  path {
    outline: none;
    &.active {
      transition: stroke-dashoffset 4s ease-out;
    }
  }
</style>
