<script lang="ts">
  import { browser } from "$app/environment";
  import { createEventDispatcher, onMount } from "svelte";

  export let width: number = 0;
  export let height: number = 0;

  class UIController {
    static width = 0;
    static height = 0;
    static observer?: ResizeObserver;
    static reference: HTMLDivElement;
    static dispatcher = createEventDispatcher();

    public static observe() {
      this.emitInitialDimensions();
      this.observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const dimensions = entry.borderBoxSize;
          for (const dimension of dimensions) {
            let dispatch = false;
            const { blockSize, inlineSize } = dimension;
            if (inlineSize !== this.width) {
              this.width = inlineSize;
              width = this.width;
              dispatch = true;
            }
            if (blockSize !== this.height) {
              this.height = blockSize;
              height = this.height;
              dispatch = true;
            }
            this.dispatcher("resize", { height, width });
          }
        }
      });
      this.observer.observe(this.reference);
    }

    private static emitInitialDimensions() {
      const { height, width } = this.reference.getBoundingClientRect();
      this.dispatcher("resize", { height, width });
    }

    public static disconnect() {
      if (this.observer) {
        this.observer.disconnect();
      }
    }
  }

  onMount(() => {
    if (browser && UIController.reference) {
      UIController.observe();
    }
    return () => {
      UIController.disconnect();
    };
  });
</script>

<div bind:this={UIController.reference}>
  <slot />
</div>

<style lang="scss">
  div {
    width: 100%;
    height: 100%;
  }
</style>
