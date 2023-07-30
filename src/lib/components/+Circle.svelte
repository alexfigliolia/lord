<script lang="ts">
  import { browser } from "$app/environment";
  import { Factory } from "$lib/state/Factory";
  import { onMount } from "svelte";

  export let animate: number = 0;
  export let progress: number = 1;
  export let startProgress: number = Infinity;
  export let stroke: string = "#000";
  export let fill: string = "#000";
  export let strokeWidth: number = 1;
  export let circleStyle: string = "";
  export let containerStyle: string = "";

  let Circle: SVGCircleElement;
  const totalLength = Factory.createWritable("Circle Animation", startProgress);

  onMount(() => {
    if (browser) {
      const length = Circle.getTotalLength();
      totalLength.update(() => length);
    }
  });
</script>

<svg
  class="circle"
  version="1.1"
  style={containerStyle}
  viewBox="0 0 500 500"
  preserveAspectRatio="xMinYMin meet"
>
  <circle
    bind:this={Circle}
    cx="250"
    cy="250"
    r="220"
    {stroke}
    {fill}
    style={`${circleStyle} transition-duration: ${animate}s`}
    stroke-width={strokeWidth}
    stroke-dasharray={$totalLength}
    stroke-dashoffset={$totalLength * (1 - progress)}
  />
  <slot />
</svg>

<style lang="scss">
  @use "$lib/variables.scss";
  .circle {
    transform: rotate(-90deg);
    height: 100%;
    width: 100%;
    & > circle {
      transition: stroke-dashoffset 1s;
      stroke-linecap: round;
    }
  }
</style>
