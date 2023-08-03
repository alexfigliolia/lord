<script lang="ts">
  import { browser } from "$app/environment";
  import { select } from "d3";
  import { onMount } from "svelte";
  import { TaskQueue } from "@figliolia/task-queue";

  export let path: string;
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
      select(Path).attr("d", path);
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
      select(Path).attr("d", path);
    }
  }
</script>

<path
  role="group"
  class="graph-path"
  class:active
  {fill}
  {stroke}
  bind:this={Path}
  on:blur={() => {}}
  on:focus={() => {}}
  on:mouseout={onMouseOut}
  on:mouseover={onMouseOver}
  on:mousemove={onMouseOver}
  stroke-width={strokeWidth}
  style="filter: drop-shadow(0px -2.5px 5px rgba(0, 0, 0, 0.1));"
/>

<style lang="scss">
  path {
    outline: none;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: 50% 90%;
    transition: stroke 1s, stroke-width 1s, fill 1s, stroke-dasharray 1s, transform 1s, opacity 1s;
    &.active {
      opacity: 1;
      transform: scaleY(1);
    }
  }
</style>
