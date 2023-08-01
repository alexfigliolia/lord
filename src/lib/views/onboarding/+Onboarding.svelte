<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import LogoLarge from "$lib/core-layout/+LogoLarge.svelte";
  import PageSwitch, { type PageSwitch as PW } from "pageswitch";

  export let minHeight: string = "55vh";

  let screenHeight: number;

  class UIController {
    static PW: PW;

    static initialize() {
      this.PW = new PageSwitch("panels", {
        duration: 600,
        direction: 1,
        start: 0,
        loop: false,
        ease: "ease",
        transition: "fade",
        mouse: false,
        mousewheel: false,
        arrowkey: false,
      });
    }
  }

  export const nextPage = () => {
    if (UIController.PW) {
      UIController.PW.next();
    }
  };

  export const previousPage = () => {
    if (UIController.PW) {
      UIController.PW.prev();
    }
  };

  onMount(() => {
    if (browser) {
      UIController.initialize();
    }
    return () => {
      if (UIController.PW) {
        UIController.PW.destroy();
      }
    };
  });
</script>

<svelte:window bind:innerHeight={screenHeight} />

<section id="login" style="height: {screenHeight}px;">
  <div class="frame">
    <LogoLarge />
    <div class="form">
      <div id="panels" style={`min-height: ${minHeight}`}>
        <slot />
      </div>
    </div>
  </div>
</section>

<style lang="scss">
  @use "$lib/variables.scss";

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  #login {
    height: 100vh;
    width: 100%;
    @include variables.center;
    background: url("$lib/images/login.jpg") no-repeat center;
    background-size: cover;
    & > .frame {
      padding: 5% 5% 5% 5%;
      box-sizing: border-box;
      width: 90%;
      max-width: 600px;
      background-color: rgba(#fff, 1);
      box-shadow: 0px 5px 10px rgba(#000, 0.25);
      @include variables.center;
      justify-content: flex-start;
      flex-direction: column;
      opacity: 0;
      animation: show 0.5s 0.25s forwards;
      & > .form {
        width: 90%;
        max-width: 450px;
        position: relative;
        & > #panels {
          width: 100%;
          position: relative;
          z-index: 1;
        }
      }
    }
  }
</style>
