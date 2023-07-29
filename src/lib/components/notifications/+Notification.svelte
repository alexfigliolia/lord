<script lang="ts">
  import X from "$lib/icons/+X.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import type { CancelFN } from "@figliolia/task-queue";

  export let ID: string;
  export let index: number;

  let hide = false;

  class UIController {
    static cancelFN: CancelFN;
    static stackPosition: number | null = null;

    public static dequeue() {
      this.cancelFN = NotificationState.lifecycle(ID, () => {
        hide = true;
      });
    }

    public static cancel() {
      if (this.cancelFN) {
        this.cancelFN();
      }
    }
  }

  export const hideNotification = () => {
    UIController.cancel();
    hide = true;
    NotificationState.dequeue(ID);
  };

  $: {
    if (UIController.stackPosition !== index) {
      if (index === 0) {
        UIController.dequeue();
      }
      UIController.stackPosition = index;
    }
  }
</script>

<div class="notification" class:hide>
  <button class="closer" on:click={hideNotification}>
    <X color="#fff" />
  </button>
  <slot />
</div>

<style lang="scss">
  @keyframes slide-in {
    0% {
      opacity: 0;
      transform: translateX(40px);
    }
    100% {
      opacity: 1;
      transform: translateX(0px);
    }
  }
  .notification {
    width: 100%;
    opacity: 1;
    height: auto;
    box-shadow: 0px 2.5px 5px rgba(#000, 0.25);
    margin-bottom: 10px;
    border-radius: 5px;
    max-height: 500px;
    overflow: hidden;
    animation: slide-in 0.3s;
    position: relative;
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
      height: 35px;
      width: 35px;
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
