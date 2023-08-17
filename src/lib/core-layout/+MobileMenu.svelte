<script lang="ts">
  import { menuOpen } from "$lib/core-layout/LayoutState";
  import Money from "$lib/icons/+Money.svelte";
  import Link from "./+Link.svelte";
  import Waves from "./+Waves.svelte";
  import Logout from "./+Logout.svelte";
  import Account from "$lib/icons/+Account.svelte";
  import People from "$lib/icons/+People.svelte";

  const onClick = () => {
    menuOpen.update(() => false);
  };
</script>

<nav class="mobile-menu" class:open={$menuOpen}>
  <div>
    <Waves />
    <div class="links">
      <div class="l-group">
        <Link label="Teams" href="/teams" color="#fff" margin="30px 0" {onClick} let:currentColor>
          <People color={currentColor} />
        </Link>
        <Link
          label="Banking"
          href="/teams/banking"
          color="#fff"
          margin="30px 0"
          {onClick}
          let:currentColor
        >
          <Money color={currentColor} />
        </Link>
        <Link
          label="Account"
          href="/teams/account"
          color="#fff"
          margin="30px 0"
          {onClick}
          let:currentColor
        >
          <Account stroke={currentColor} fill="transparent" />
        </Link>
        <Logout {onClick} />
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  @use "$lib/variables.scss";
  .mobile-menu {
    position: fixed;
    pointer-events: none;
    visibility: hidden;
    top: variables.$headerHeightSmall;
    left: 0;
    height: calc(100% - variables.$headerHeightSmall);
    width: 100%;
    z-index: 9998;
    transform: translateY(-120%);
    transition: visibility 0s 0.5s, transform 0.5s 0s;
    @media #{variables.$mq-670} {
      top: variables.$headerHeightLarge;
      height: calc(100% - variables.$headerHeightLarge);
    }
    @media #{variables.$mq-1200} {
      display: none;
    }
    & > div {
      height: 100%;
      width: 100%;
      position: relative;
      & > .links {
        z-index: 2;
        width: 100%;
        @include variables.center;
        flex-direction: column;
        position: relative;
        & > .l-group {
          margin-top: 30px;
          text-align: center;
          width: 100%;
          min-height: 50vh;
          @include variables.center;
          flex-direction: column;
        }
      }
    }
    &.open {
      pointer-events: auto;
      visibility: visible;
      transform: translateY(0%);
      transition: visibility 0s 0s, transform 0.5s 0s;
    }
  }
</style>
