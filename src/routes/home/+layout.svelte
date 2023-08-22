<script lang="ts">
  import Header from "$lib/core-layout/+Header.svelte";
  import MobileMenu from "$lib/core-layout/+MobileMenu.svelte";
  import SideBar from "$lib/core-layout/+SideBar.svelte";
  import { organizations, residencies } from "$lib/state/Organization";
  import Notifications from "$lib/core-layout/+Notifications.svelte";
  import { currentUser } from "$lib/state/User";
  import type { CoreLayoutData } from "$lib/core-layout/types";

  export let data: CoreLayoutData;

  $: organizations.set(data.organizations);
  $: currentUser.set(data.user);
  $: residencies.set(data.residencies);
</script>

<div id="coreApp">
  <Header />
  <MobileMenu />
  <div class="route">
    <SideBar />
    <slot />
  </div>
</div>
<Notifications />

<style lang="scss">
  @use "$lib/variables.scss";
  #coreApp {
    min-height: 100vh;
    width: 100%;
    & > .route {
      width: 95%;
      padding-bottom: 50px;
      margin: variables.$headerHeightSmall auto auto;
      display: flex;
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
