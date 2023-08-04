<script lang="ts">
  import X from "$lib/icons/+X.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { ModalStack } from "$lib/generics/UX/ModalStack";
  import LinearGradient from "$lib/components/gradients/+LinearGradient.svelte";

  let height: number;

  export let onClose: () => void;
  export let visible: boolean = false;

  class UIController {
    static stackID: string | null = null;

    static onUnmount() {
      this.onInvisible();
    }

    static onVisible() {
      if (!this.stackID) {
        this.stackID = ModalStack.push(onClose);
      }
    }

    static onInvisible() {
      if (this.stackID) {
        ModalStack.delete(this.stackID);
        this.stackID = null;
      }
    }
  }

  onMount(() => {
    return () => {
      if (browser) {
        UIController.onUnmount();
      }
    };
  });

  $: {
    if (browser) {
      if (visible) {
        UIController.onVisible();
      } else {
        UIController.onInvisible();
      }
    }
  }
</script>

<svelte:window bind:innerHeight={height} />

<div class="modal" class:visible style={`height: ${height}px; max-height: ${height}px`}>
  <div style={`max-height: ${height}px`}>
    <button class="closer" on:click={onClose}>
      <X color="url(#xgrad)">
        <LinearGradient id="xgrad" />
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
      height: 100vh;
      background-color: #fff;
      overflow-y: scroll;
      transform: scale(0.8);
      max-width: 800px;
      opacity: 0;
      transition: transform 0.3s 0s, opacity 0.3s 0s;
      position: relative;
      -webkit-overflow-scrolling: touch;
      @media #{variables.$mq-670} {
        height: 80vh;
        width: 80%;
      }
      & > .closer {
        top: 7.5px;
        left: calc(100% - 57.5px);
        width: 60px;
        height: 60px;
        outline: none;
        border: none;
        position: sticky;
        z-index: 10;
        margin: 0;
        padding: 0;
        background-color: transparent;
        @include variables.center;
      }
      & > div {
        width: 100%;
        margin-top: -57.5px;
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
        transition-duration: 0.3s;
        &:hover,
        &:focus {
          transform: scale(1.1);
        }
      }
    }
  }
</style>
