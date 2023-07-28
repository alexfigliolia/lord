<script lang="ts">
  import Link from "./+Link.svelte";
  import Logo from "./+Logo.svelte";
  import Account from "$lib/icons/+Account.svelte";
  import Building from "$lib/icons/+Building.svelte";
  import Chart from "$lib/icons/+Chart.svelte";
  import Money from "$lib/icons/+Money.svelte";
  import Logout from "./+Logout.svelte";
  import { visible } from "$lib/state/Add";

  const openAdd = () => {
    visible.set(true);
  };
</script>

<nav>
  <div>
    <div class="logo">
      <Logo />
    </div>
    <button class="add" on:click={openAdd}>ADD +</button>
    <div class="links">
      <Link label="Overview" href="/app" color="#9b8cae" activeColor="#9e91fc" let:currentColor>
        <Chart color={currentColor} />
      </Link>
      <Link
        label="Properties"
        href="/app/properties"
        color="#9b8cae"
        activeColor="#9e91fc"
        let:currentColor
      >
        <Building color={currentColor} />
      </Link>
      <Link
        label="Banking"
        href="/app/banking"
        color="#9b8cae"
        activeColor="#9e91fc"
        let:currentColor
      >
        <Money color={currentColor} />
      </Link>
      <Link
        label="Account"
        href="/app/account"
        color="#9b8cae"
        activeColor="#9e91fc"
        let:currentColor
      >
        <Account color={currentColor} />
      </Link>
      <Logout backgroundColor="#9e91fc" textColor="#fff" margin="10px 0" />
    </div>
  </div>
</nav>

<style lang="scss">
  @use "$lib/variables.scss";
  nav {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 200px;
    background-color: #fff;
    text-align: center;
    box-shadow: 2.5px 0px 10px rgba(#000, 0.1);
    display: none;
    @media #{variables.$mq-1200} {
      display: block;
    }
    & > div {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      & > .logo {
        margin-top: 20%;
      }
      & > .add {
        cursor: pointer;
        padding: 0;
        border: none;
        margin-top: 40px;
        margin-bottom: 10px;
        height: 100px;
        width: 100px;
        color: #fff;
        border-radius: 10px;
        @include variables.center;
        font-weight: 700;
        background-color: variables.$core;
        box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
      }
    }
  }
</style>
