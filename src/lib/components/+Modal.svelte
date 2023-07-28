<script lang="ts">
  import X from "$lib/icons/+X.svelte";
  import { onMount } from "svelte";
  import { TaskQueue } from "@figliolia/task-queue";
  import { FocusTrap } from "$lib/accessibility/FocusTrap";

  let height: number;

  export let onClose: () => void;
  export let visible: boolean = false;

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.which === 27 || e.key === "Escape") {
      onClose();
      UIController.onInvisible();
    }
  };

  class UIController {
    static Queue = new TaskQueue();
    static content: HTMLDivElement;
    static closer: HTMLButtonElement;
    static trap: null | FocusTrap = null;

    static onUnmount() {
      this.Queue.clearPendingTasks();
      window.removeEventListener("keydown", onKeyDown);
      if (this.trap) {
        this.onInvisible();
      }
    }

    static onVisible() {
      if (!this.trap) {
        this.Queue.deferTask(() => {
          this.trap = new FocusTrap(this.content);
          this.trap.initialize();
        }, 600);
        window.addEventListener("keydown", onKeyDown);
      }
    }

    static onInvisible() {
      if (this.trap) {
        this.trap.destroy();
        this.trap = null;
        window.removeEventListener("keydown", onKeyDown);
      }
    }
  }

  onMount(() => {
    return () => {
      UIController.onUnmount();
    };
  });

  $: {
    if (visible) {
      UIController.onVisible();
    } else {
      UIController.onInvisible();
    }
  }
</script>

<svelte:window bind:innerHeight={height} />

<div class="modal" class:visible style={`height: ${height}px; max-height: ${height}px`}>
  <div bind:this={UIController.content} style={`max-height: ${height}px`}>
    <button bind:this={UIController.closer} class="closer" on:click={onClose}>
      <X color="url(#xgrad)">
        <defs>
          <linearGradient id="xgrad" x1="0" x2="1" y1="0" y2="0">
            <stop stop-color="#9284fc" offset="0" />
            <stop stop-color="rgb(145, 189, 252)" offset="1" />
          </linearGradient>
        </defs>
      </X>
    </button>
    <div>
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";

  .modal {
    height: 100vh;
    width: 100%;
    background-color: rgba(#000, 0.75);
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 10000;
    transition-duration: 0.3s;
    transition-delay: 0.25s;
    visibility: hidden;
    pointer-events: none;
    @include variables.center;
    transition: opacity 0.3s 0.25s, visibility 0s 0.5s;
    & > div {
      width: 100%;
      max-width: 800px;
      height: 100vh;
      background-color: #fff;
      overflow-y: scroll;
      transform: scale(0.8);
      opacity: 0;
      transition: transform 0.3s 0s, opacity 0.3s 0s;
      position: relative;
      @media #{variables.$mq-670} {
        height: 80vh;
      }
      & > .closer {
        top: 2.5%;
        right: 2.5%;
        width: 50px;
        height: 50px;
        outline: none;
        border: none;
        position: absolute;
        margin: 0;
        padding: 0;
        background: rgba(#000, 0.75);
        border-radius: 50%;
        box-shadow: 0px 2.5px 7.5px rgba(#000, 0.35);
        @include variables.center;
        transition: transform 0.3s 0s, opacity 0.3s 0s;
        opacity: 0;
        transform: scale(0);
        &:hover,
        &:focus {
          opacity: 1;
          transform: scale(1.1);
        }
      }
      & > div {
        width: 100%;
      }
    }
  }

  .modal.visible {
    opacity: 1;
    transition-delay: 0;
    visibility: visible;
    pointer-events: auto;
    transition: opacity 0.3s 0s, visibility 0s 0s;
    & > div {
      opacity: 1;
      transform: scale(1);
      transition: transform 0.3s 0.25s, opacity 0.3s 0.25s;
      & > .closer {
        opacity: 1;
        transform: scale(1);
        transition: transform 0.3s 0.5s, opacity 0.3s 0.5s;
      }
    }
  }
</style>
