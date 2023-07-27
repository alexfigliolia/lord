<script lang="ts">
  import { menuOpen } from "$lib/core-layout/LayoutState";
  import Building from "$lib/icons/+Building.svelte";
  import Chart from "$lib/icons/+Chart.svelte";
  import Money from "$lib/icons/+Money.svelte";
  import Link from "./+Link.svelte";
  import Waves from "./+Waves.svelte";
  import Logout from "./+logout.svelte";

  const onClick = () => {
    menuOpen.update(() => false);
  };
</script>

<nav class="mobile-menu" class:open={$menuOpen}>
  <div>
    <Waves />
    <div class="links">
      <div class="l-group">
        <Link label="Overview" href="/app" color="#fff" margin="30px 0" {onClick} let:currentColor>
          <Chart color={currentColor} />
        </Link>
        <Link
          label="Properties"
          href="/app/properties"
          color="#fff"
          margin="30px 0"
          {onClick}
          let:currentColor
        >
          <Building color={currentColor} />
        </Link>
        <Link
          label="Banking"
          href="/app/banking"
          color="#fff"
          margin="30px 0"
          {onClick}
          let:currentColor
        >
          <Money color={currentColor} />
        </Link>
        <Link
          label="Account"
          href="/app/account"
          color="#fff"
          margin="30px 0"
          {onClick}
          let:currentColor
        >
          <Money color={currentColor} />
        </Link>
        <Logout />
      </div>
    </div>
  </div>
</nav>

<style lang="scss">
  @use "$lib/variables.scss";
  .mobile-menu {
    position: fixed;
    top: variables.$headerHeightSmall;
    left: 0;
    height: calc(100% - variables.$headerHeightSmall);
    width: 100%;
    z-index: 999;
    transform: translateY(-120%);
    transition-duration: 0.5s;
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
          & > .link {
            margin: 25px 0;
            position: relative;
            &::after {
              position: absolute;
              top: 50%;
              left: 0;
              height: 2px;
              width: 100%;
              background-color: #fff;
            }
            & > a {
              font-weight: 600;
              font-size: 1.5em;
              color: #fff;
              cursor: pointer;
            }
          }
        }
      }
    }
    &.open {
      transform: translateY(0%);
    }
  }
</style>
