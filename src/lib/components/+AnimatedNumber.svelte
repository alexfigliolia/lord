<script lang="ts">
  import { Factory } from "$lib/state/Factory";
  import { TaskQueue, type CancelFN } from "@figliolia/task-queue";
  import { onMount } from "svelte";

  export let active: boolean;
  export let style: string = "";
  export let delay: number = 5000;
  export let duration: number = 1.5;
  export let value: number | string;
  export let fontSize: string = "25px";
  export let height: string = fontSize;

  const after = Factory.createWritable<
    {
      value: string;
      children: (number | string)[];
    }[]
  >("Counting Animation", []);

  export const reset = () => {
    after.set([]);
  };

  class UIController {
    static visible = false;
    static Queue = new TaskQueue();
    static reference: HTMLDivElement;
    static cancelFN: CancelFN | undefined;

    public static animate() {
      this.setup();
      this.execute();
    }

    private static setup() {
      const regex = /(\D+)?(\d+)(\D+)?(\d+)?(\D+)?/;
      let result = [...(regex.exec(value + "") || [])];
      result.shift();
      result = result.filter(res => res != null);
      while (this.reference.firstChild) {
        this.reference.removeChild(this.reference.firstChild);
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
      this.visible = true;
    }

    private static execute() {
      this.cancelFN = this.Queue.deferTask(() => {
        const ticks = [...this.reference.querySelectorAll("div[data-value]")];
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
      }, delay);
    }
  }

  onMount(() => {
    return () => {
      UIController.Queue.clearDeferredTasks();
    };
  });

  let prev: any = null;
  $: {
    if (active && UIController.reference && value !== prev) {
      UIController.cancelFN?.();
      prev = value;
      UIController.animate();
    }
  }
</script>

<div
  class="counter"
  bind:this={UIController.reference}
  class:visible={UIController.visible}
  aria-label={value.toString()}
  style={style + `font-size:${fontSize}; height: ${height}`}
>
  {value}
  {#each $after as token, index (index)}
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
