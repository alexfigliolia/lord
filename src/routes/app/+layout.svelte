<script lang="ts">
  import Header from "$lib/core-layout/+Header.svelte";
  import MobileMenu from "$lib/core-layout/+MobileMenu.svelte";
  import SideBar from "$lib/core-layout/+SideBar.svelte";
  import AddModal from "$lib/core-layout/+AddModal.svelte";
  import { organizations } from "$lib/state/Organization";
  import type { OrganizationsPayload } from "$lib/types/derived";
  import Notifications from "$lib/core-layout/+Notifications.svelte";

  export let data: OrganizationsPayload;

  $: organizations.set(data.data.organizations);
</script>

<div id="coreApp">
  <Header />
  <MobileMenu />
  <div class="route">
    <SideBar />
    <slot />
  </div>
</div>
<AddModal />
<Notifications />

<style lang="scss">
  @use "$lib/variables.scss";
  #coreApp {
    background-color: variables.$coreBG;
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
