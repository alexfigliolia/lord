<script lang="ts">
  import { browser } from "$app/environment";
  import { TaskQueue } from "@figliolia/task-queue";
  import { onMount } from "svelte";
  import Circle from "$lib/components/data-viz/+Circle.svelte";
  import AnimatedNumber from "./+AnimatedNumber.svelte";

  export let percentage: number;
  export let duration: number = 1;
  export let textStyle: string = "";
  export let stroke: string = "$000";
  export let fontSize: string = "25px";

  const Queue = new TaskQueue();
  let speed = 0;
  let progress = 0;

  onMount(() => {
    if (browser) {
      Queue.deferTask(() => {
        speed = duration;
      }, 500);
      Queue.deferTask(() => {
        progress = percentage;
      }, 700);
    }
    return () => {
      Queue.clearDeferredTasks();
    };
  });
</script>

<div class="position">
  <div class="circles">
    <Circle
      {progress}
      animate={speed}
      {stroke}
      fill="transparent"
      strokeWidth={60}
      startProgress={0}
      containerStyle="position: absolute; top: 0; left: 0; z-index: 2; filter: drop-shadow(0px 7px 7px rgb(0,0,0, 0.15));"
    >
      <slot />
    </Circle>
    <Circle stroke="rgb(241, 241, 241)" fill="transparent" strokeWidth={60} />
  </div>
  <div class="val">
    <AnimatedNumber
      active
      {fontSize}
      value={`${percentage * 100}%`}
      style="color: #9e91fc; font-weight: 300; {textStyle}"
    />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .position {
    width: 100%;
    @include variables.center;
    position: relative;
    & > .circles {
      position: relative;
      width: 100%;
      max-width: 400px;
    }
    & > .val {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      @include variables.center;
    }
  }
</style>
