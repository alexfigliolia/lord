<script lang="ts">
  import ResizeObserver from "$lib/components/observers/+ResizeObserver.svelte";
  import type { ResizeObserverEvent } from "$lib/components/observers/types";

  let height: number = 0;

  export let stroke: string;
  export let style: string = "";
  export let duration: number = 2;
  export let percentage: number = 100;
  export let fill: string = "transparent";
  export let onResize: (e: ResizeObserverEvent) => void = () => {};

  $: dimensions = height;
  $: radius = dimensions / 2;
  $: strokeWidth = radius / 5;
  $: innerRadius = radius - strokeWidth / 2;
  $: circumference = innerRadius * 2 * Math.PI;
  $: arc = circumference * (270 / 360);
  $: dashArray = `${arc} ${circumference}`;
  $: transform = `rotate(135, ${radius}, ${radius})`;
  $: percentNormalized = Math.min(Math.max(percentage, 0), 100);
  $: dashOffset = arc - (percentNormalized / 100) * arc;
</script>

<ResizeObserver bind:height on:resize={onResize}>
  <svg viewBox={`0 0 ${dimensions} ${dimensions}`}>
    <circle
      class="bg"
      {transform}
      cx={radius}
      cy={radius}
      r={innerRadius}
      stroke-linecap="round"
      stroke-width={strokeWidth / 1.5}
      stroke-dasharray={dashArray}
    />
    <circle
      {fill}
      {stroke}
      {transform}
      cx={radius}
      cy={radius}
      r={innerRadius}
      stroke-linecap="round"
      stroke-width={strokeWidth}
      stroke-dasharray={dashArray}
      stroke-dashoffset={dashOffset}
      style="transition: stroke-dashoffset {percentage ? duration : 0}s; {style}"
    />
    <slot />
  </svg>
</ResizeObserver>

<style lang="scss">
  svg {
    width: 100%;
    height: 100%;
    overflow: visible;
    & > .bg {
      fill: transparent;
      stroke: rgb(231, 231, 231);
    }
  }
</style>
