<script lang="ts">
  import { TaskQueue } from "@figliolia/task-queue";
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  export let duration: number = 1.5;
  export let delay: number = 500;
  export let active: boolean;
  export let value: number | string;
  export let fontSize: string = "25px";
  export let height: string = fontSize;
  export let style: string = "";

  const Queue = new TaskQueue();
  let reference: HTMLHeadElement;

  let visible = false;
  let finished = false;
  const after = writable<{ value: string; children: (number | string)[] }[]>([]);

  const execute = () => {
    if (!finished) {
      finished = true;
      const ticks = [...reference.querySelectorAll("div[data-value]")];
      for (const tick of ticks) {
        const value = tick.getAttribute("data-value") || "";
        // @ts-ignore
        if (parseInt(value) == value) {
          const dist = parseInt(value) + 1;
          (tick as HTMLElement).style.transform = `translateY(-${dist * 100}%)`;
        } else {
          (tick as HTMLElement).style.transform = `translateY(-${100}%)`;
        }
      }
    }
  };

  const setup = () => {
    finished = false;
    const regex = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
    let result = [...(regex.exec(value + "") || [])];
    result.shift();
    result = result.filter(res => res != null);

    while (reference.firstChild) {
      reference.removeChild(reference.firstChild);
    }
    for (let res of result) {
      // @ts-ignore
      if (isNaN(res)) {
        after.update(v => [...v, { value: res, children: [res] }]);
      } else {
        for (let i = 0; i < res.length; i++) {
          const value = res[i];
          const int = parseInt(value);
          if (isNaN(int)) {
            continue;
          }
          const children = value
            ? new Array(parseInt(value) + 1)
                // @ts-ignore
                .join(0)
                // @ts-ignore
                .split(0)
                .map((_, i) => i)
            : [];
          after.update(v => [...v, { value, children }]);
        }
      }
    }
    visible = true;
  };

  onMount(() => {
    return () => {
      Queue.clearDeferredTasks();
    };
  });

  let prev: any = null;
  $: {
    if (active && reference && value !== prev) {
      prev = value;
      setup();
      Queue.deferTask(execute, delay);
    }
  }
</script>

<div
  class="counter"
  class:visible
  bind:this={reference}
  aria-label={value.toString()}
  style={style + `font-size:${fontSize}; height: ${height}`}>
  {value}
  {#each $after as token}
    <div data-value={token.value} style={`transition: transform ${duration}s ease`}>
      <div />
      {#each token.children as child}
        <div>{child}</div>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  .counter {
    line-height: 1;
    position: relative;
    display: flex;
    overflow: hidden;
    align-items: center;
    margin: 0;
    opacity: 0;
    &.visible {
      opacity: 1;
    }
    & > div {
      z-index: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      transform: translateY(0);
      line-height: 1;
      div {
        flex: 0 0 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    $d: 0;
    $inc: 0.375;
    @for $i from 1 through 20 {
      &:nth-child(#{$i}) > div {
        transition-delay: #{$d * 1s};
      }
      $d: $d + $inc;
    }
  }
</style>
