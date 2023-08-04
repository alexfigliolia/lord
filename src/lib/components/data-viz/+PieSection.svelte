<script lang="ts">
  export let path: string;
  export let title: string;
  export let value: number;
  export let delay: number = 0;
  export let fill: string = "#000";

  let Path: SVGPathElement;
</script>

<path {fill} d={path} bind:this={Path} style="animation-delay: {delay}ms;">
  <title>{title}: {value.toLocaleString()}</title>
</path>

<style lang="scss">
  @keyframes enter {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  path {
    outline: none;
    transform: scale(0);
    animation: enter 0.75s forwards;
  }
</style>
