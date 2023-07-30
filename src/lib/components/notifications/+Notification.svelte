<script lang="ts">
  import { ModalStack } from "$lib/generics/ModalStack";
  import X from "$lib/icons/+X.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import type { CancelFN } from "@figliolia/task-queue";
  import { onMount } from "svelte";

  export let ID: string;
  export let index: number;

  let hide = false;
  let show = false;

  class UIController {
    static cancelFN: CancelFN;
    static stackID: string | null = null;
    static stackPosition: number | null = null;

    public static onRender(nextIndex: number) {
      if (this.stackID === null) {
        this.stackID = ModalStack.push(hideNotification);
      }
      if (this.stackPosition !== nextIndex) {
        if (nextIndex === 0) {
          this.deferredPop();
        } else if (this.stackPosition === 0) {
          this.cancel();
        }
        this.stackPosition = nextIndex;
      }
    }

    public static unmount() {
      this.cancel();
      this.removeSelf();
    }

    private static deferredPop() {
      this.cancelFN = NotificationState.lifecycle(ID, () => {
        hide = true;
        this.removeSelf();
      });
    }

    private static cancel() {
      if (this.cancelFN) {
        this.cancelFN();
      }
    }

    private static removeSelf() {
      if (this.stackID) {
        ModalStack.delete(this.stackID);
      }
    }
  }

  export const hideNotification = () => {
    UIController.unmount();
    hide = true;
    NotificationState.pop(ID);
  };

  $: index, UIController.onRender(index);

  onMount(() => {
    setTimeout(() => {
      show = true;
    }, 0);
    return () => {
      UIController.unmount();
    };
  });
</script>

<div class="notification" class:hide class:show>
  <button class="closer" on:click={hideNotification}>
    <X color="#fff" />
  </button>
  <slot />
</div>

<style lang="scss">
  //   @keyframes slide-in {
  //   0% {
  //     opacity: 0;
  //     transform: translateX(40px);
  //     max-height: 0px;
  //   }
  //   60% {
  //     max-height: 500px;
  //   }
  //   80% {
  //     transform: translateX(0px);
  //   }
  //   100% {
  //     opacity: 1;
  //     max-height: 500px;
  //   }
  // }
  .notification {
    width: 100%;
    height: auto;
    box-shadow: 0px 2.5px 5px rgba(#000, 0.25);
    border-radius: 5px;
    overflow: hidden;
    position: relative;
    opacity: 0;
    max-height: 0px;
    margin-bottom: 0;
    transform: translateX(40px);
    &.show {
      opacity: 1;
      max-height: 500px;
      margin-bottom: 10px;
      transform: translateX(0px);
      transition: max-height 0.6s 0s, margin-bottom 0.6s 0s, opacity 0.6s 0.1s, transform 0.6s 0.1s;
    }
    &.hide {
      max-height: 0px;
      opacity: 0;
      margin-bottom: 0;
      transition-duration: 0.4s;
      transition: opacity 0.3s 0s, max-height 0.5s 0.15s, margin-bottom 0.2s 0.3s;
    }
    & > .closer {
      position: absolute;
      top: 0;
      right: 0;
      height: 30px;
      width: 30px;
      margin: 0;
      padding: 0;
      outline: none;
      border: none;
      z-index: 4;
      box-sizing: border-box;
      background-color: transparent;
    }
  }
</style>
