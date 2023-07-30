<script lang="ts">
  import Notification from "./+Notification.svelte";

  export let ID: string;
  export let index: number;
  export let title: string;
  export let message: string = "";
  export let background: string = "linear-gradient(to right, rgb(85, 192, 138), rgb(46, 173, 110))";

  let hide: () => void;
  export const hideNotification = () => {
    hide();
  };
</script>

<Notification {ID} {index} bind:hideNotification={hide}>
  <div class="inner" style={`background: ${background};`}>
    <div class="circ circ1" />
    <div class="circ circ2" />
    <div class="icon">
      <slot />
    </div>
    <div class="message">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  </div>
</Notification>

<style lang="scss">
  .inner {
    width: 100%;
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
    background: linear-gradient(to right, rgb(85, 192, 138), rgb(46, 173, 110));
    overflow: hidden;
    & > .circ {
      height: 90px;
      width: 90px;
      position: absolute;
      background-color: rgba(#fff, 0.2);
      border-radius: 50%;
      &.circ1 {
        top: -40px;
        right: 15px;
      }
      &.circ2 {
        top: 40px;
        right: -40px;
      }
    }
    & > .icon {
      height: 70px;
      width: 70px;
      min-width: 70px;
      min-height: 70px;
      background-color: rgba(#fff, 0.4);
      border-radius: 50%;
      margin-right: 20px;
    }
    & > .message {
      width: 100%;
      color: #fff;
      & > h3 {
        margin: 0;
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 1.5em;
      }
      & > p {
        margin: 0;
        font-weight: 300;
      }
    }
  }
</style>
