<script>
  import "./reset.scss";
  import Header from "$lib/core-layout/+Header.svelte";
  import Drawer from "$lib/core-layout/+Drawer.svelte";
  import SideBar from "$lib/core-layout/+SideBar.svelte";
</script>

<div id="coreApp">
  <Header />
  <Drawer />
  <div class="route">
    <SideBar />
    <slot />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  #coreApp {
    background-color: variables.$coreBG;
    min-height: 100vh;
    width: 100%;
    & > .route {
      width: 95%;
      padding-top: 10px;
      margin: variables.$headerHeightSmall auto auto;
      display: flex;
      height: 200vh;
      @media #{variables.$mq-670} {
        margin: variables.$headerHeightLarge auto auto;
      }
      @media #{variables.$mq-1200} {
        margin: 0 auto auto calc(200px + 2.5%);
        width: calc(95% - 200px);
      }
    }
  }
</style>
