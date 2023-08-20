<script lang="ts">
  import { onMount } from "svelte";
  import { TaskQueue } from "@figliolia/task-queue";

  export let path: string;
  export let style: string = "";
  export let data: number[] = [];
  export let fill: string = "#000";
  export let strokeWidth: number = 0;
  export let stroke: string = "transparent";
  export let onMouseOut: null | ((position: MouseEvent, data: number[]) => void) = null;
  export let onMouseOver: null | ((position: MouseEvent, data: number[]) => void) = null;

  let Path: SVGPathElement;
  let active = false;

  const mouseOver = (e: MouseEvent) => {
    onMouseOver?.(e, data);
  };

  const mouseOut = (e: MouseEvent) => {
    onMouseOut?.(e, data);
  };

  onMount(() => {
    const Queue = new TaskQueue();
    Queue.deferTask(() => {
      active = true;
    }, 500);
    return () => {
      Queue.clearDeferredTasks();
    };
  });
</script>

<path
  {fill}
  {style}
  {stroke}
  d={path}
  class:active
  role="group"
  bind:this={Path}
  class="graph-path"
  on:blur={() => {}}
  on:focus={() => {}}
  on:mouseout={mouseOut}
  on:mouseover={mouseOver}
  on:mousemove={mouseOver}
  stroke-width={strokeWidth}
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
