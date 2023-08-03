<script lang="ts">
  import { DateScaling } from "$lib/graphing/DateScaling";
  import NumericStatus from "$lib/components/data-viz/+NumericStatus.svelte";
  import { derived, type Writable } from "svelte/store";

  export let flip: Writable<boolean>;
  export let dataPoint: Writable<number>;
  export let pointDate: Writable<number>;
  export let positionX: Writable<number>;
  export let positionY: Writable<number>;
  export let prevPoint: Writable<number>;
  export let labelActive: Writable<boolean>;

  let reference: HTMLDivElement;

  let reset: () => void;

  const month = derived(pointDate, v => DateScaling.months[new Date(v).getMonth()]);
  const percentageChange = derived([dataPoint, prevPoint], v => {
    const [cur, prev] = v;
    const div = cur / prev;
    if (div === 0) {
      return Number(0).toFixed(2);
    }
    return Number(100 * Math.abs((cur - prev) / ((cur + prev) / 2))).toFixed(2);
  });
  const position = derived([flip, positionX], v => {
    const [flip, positionX] = v;
    if (!flip || !reference) {
      return positionX;
    }
    return positionX - reference.getBoundingClientRect().width;
  });

  labelActive.subscribe(v => {
    if (v === false) {
      reset?.();
    }
  });
</script>

<div
  class="label"
  bind:this={reference}
  class:visible={$labelActive}
  style={`top: ${$positionY}px; left: ${$position}px`}
>
  <NumericStatus
    delay={20}
    duration={0.5}
    title={$month}
    bind:reset
    change={`${$percentageChange}%`}
    positive={$prevPoint < $dataPoint}
    value={`$${$dataPoint.toLocaleString()}`}
  />
</div>

<style lang="scss">
  @use "$lib/variables";
  .label {
    position: absolute;
    @include variables.center;
    pointer-events: none;
    opacity: 0;
    box-sizing: border-box;
    box-shadow: 0px 5px 15px rgba(#000, 0.15);
    border-radius: 10px;
    &.visible {
      opacity: 1;
      transition: opacity 0.25s;
    }
  }
</style>
