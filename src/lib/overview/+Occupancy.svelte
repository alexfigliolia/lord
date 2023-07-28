<script lang="ts">
  import { TaskQueue } from "@figliolia/task-queue";
  import DisplayTile from "$lib/components/+DisplayTile.svelte";
  import { onMount } from "svelte";
  import Circle from "$lib/components/+Circle.svelte";
  import { browser } from "$app/environment";
  import AnimatedNumber from "$lib/components/+AnimatedNumber.svelte";

  const Queue = new TaskQueue();
  let speed = 0;
  let progress = 0;

  onMount(() => {
    if (browser) {
      Queue.deferTask(() => {
        speed = 1;
      }, 500);
      Queue.deferTask(() => {
        progress = 0.85;
      }, 700);
    }
    return () => {
      Queue.clearDeferredTasks();
    };
  });
</script>

<DisplayTile title="Occupancy" subtitle="All Properties">
  <div class="position">
    <div class="circles">
      <Circle
        {progress}
        animate={speed}
        stroke="url(#vGrad)"
        fill="transparent"
        strokeWidth={60}
        startProgress={0}
        containerStyle="position: absolute; top: 0; left: 0; z-index: 2; filter: drop-shadow(0px 7px 7px rgb(0,0,0, 0.15));">
        <defs>
          <linearGradient id="vGrad" x1="0" x2="1" y1="0" y2="0">
            <stop stop-color="#9284fc" offset="0" />
            <stop stop-color="rgb(145, 189, 252)" offset="1" />
          </linearGradient>
        </defs>
      </Circle>
      <Circle stroke="rgb(241, 241, 241)" fill="transparent" strokeWidth={60} />
    </div>
    <div class="val">
      <AnimatedNumber
        active
        value="85%"
        fontSize="70px"
        style="color: #9e91fc; font-weight: 300;" />
    </div>
  </div>
</DisplayTile>

<style lang="scss">
  @use "$lib/variables.scss";
  .position {
    width: 100%;
    @include variables.center;
    position: relative;
    & > .circles {
      position: relative;
      width: 100%;
      // max-width: 400px;
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
