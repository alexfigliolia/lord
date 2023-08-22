<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  export let height: number = 10;
  export let progress: number = 100;
  export let animate: boolean = false;
  export let color: string = "#9e91fc";

  let progressValue = animate ? 0 : progress;
  onMount(() => {
    if (browser && animate) {
      progressValue = progress;
    }
  });
</script>

<div class="progress">
  <div class="bar bottom" style="height: {height}px;" />
  <div
    class="bar top"
    style="
		height: {height}px; 
		background: {color}; 
		width: {progressValue}%;"
  />
</div>

<style lang="scss">
  .progress {
    width: 100%;
    position: relative;
    & > .bar {
      width: 100%;
      border-radius: 100px;
      &.bottom {
        background-color: #ddd;
      }
      &.top {
        position: absolute;
        top: 0;
        left: 0;
        transition: width 0.75s 0.6s;
        box-shadow: 0px 2.5px 5px rgba(0, 0, 0, 0.05);
      }
    }
  }
</style>
