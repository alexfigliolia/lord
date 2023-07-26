<script lang="ts">
  import Burger from "./+Burger.svelte";
  import Logo from "./+Logo.svelte";
</script>

<header id="coreHeader">
  <div>
    <Logo />
    <Burger />
  </div>
</header>

<style lang="scss">
  @use "$lib/variables.scss";
  #coreHeader {
    position: fixed;
    top: 0;
    left: 0;
    height: variables.$headerHeightSmall;
    width: 100%;
    z-index: 1000;
    background-color: #fff;
    box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
    @media #{variables.$mq-670} {
      height: variables.$headerHeightLarge;
    }
    @media #{variables.$mq-1200} {
      display: none;
    }
    & > div {
      width: 95%;
      margin: 0 auto;
      height: 100%;
      @include variables.center;
      justify-content: space-between;
    }
  }
</style>
