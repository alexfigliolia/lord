<script lang="ts">
  import LinearGradient from "$lib/components/+LinearGradient.svelte";
  import { LayoutState, menuOpen } from "$lib/core-layout/LayoutState";
</script>

<button
  id="burger"
  on:click={LayoutState.toggleMenu.bind(LayoutState)}
  class="burger"
  class:open={$menuOpen}
>
  <svg class="circ" version="1.1" viewBox="0 0 500 500" preserveAspectRatio="xMinYMin meet">
    <circle cx="250" cy="250" r="200" />
    <LinearGradient id="bGrad" />
  </svg>
  <div>
    <div class="bar top" />
    <div class="bar middle" />
    <div class="bar bottom" />
  </div>
</button>

<style lang="scss">
  @use "$lib/variables";
  .burger {
    outline: none;
    border: none;
    background-color: transparent;
    width: variables.$headerHeightSmall;
    height: variables.$headerHeightSmall;
    @include variables.center;
    margin: 0;
    padding: 0;
    position: relative;
    @media #{variables.$mq-670} {
      transform: scale(1.2);
    }
    & > .circ {
      position: absolute;
      top: 0;
      right: 0;
      transform: rotate(-90deg);
      filter: drop-shadow(0px 1px 2px rgba(#000, 0.1));
      & > circle {
        fill: transparent;
        stroke: url("#bGrad");
        stroke-width: 20px;
        stroke-dasharray: 1256;
        stroke-dashoffset: 1256;
        transition-duration: 0.65s;
        transition-delay: 0s;
      }
    }
    & > div {
      height: 42.5%;
      width: 65%;
      position: relative;
      transition-duration: 0.3s;
      transition-delay: 0.3s;
      & > .bar {
        height: 2px;
        width: 100%;
        background: linear-gradient(to right, variables.$core, variables.$core2);
        position: absolute;
        transition-duration: 0.3s;
        border-radius: 1px;
        box-shadow: 0px 1px 2.5px rgba(0, 0, 0, 0.2);
        &.top {
          top: 0;
          left: 0;
          transition-delay: 0.3s;
        }
        &.middle {
          top: calc(50% - 1px);
          left: 0;
          transition-delay: 0.3s;
        }
        &.bottom {
          top: calc(100% - 2px);
          left: 0;
          width: 60%;
          transition-delay: 0.6s;
          transform-origin: 0% 50%;
        }
      }
    }
  }
  .burger.open {
    & > .circ > circle {
      stroke-dasharray: 1256;
      stroke-dashoffset: 0;
      transition-delay: 0.3s;
      transition-duration: 0.75s;
    }
    & > div {
      transform: scale(0.8);
      transition-delay: 0.3s;
      & > .bar {
        &.top {
          top: 0;
          left: 0;
          transition-delay: 0.3s;
          transform: rotate(-45deg) translateY(7px) translateX(-7px);
        }
        &.middle {
          top: calc(50% - 1px);
          left: 0;
          transition-delay: 0.3s;
          transform: rotate(45deg);
        }
        &.bottom {
          top: calc(100% - 2px);
          left: 0;
          transform: scaleX(0);
          transition-delay: 0s;
        }
      }
    }
  }
</style>
