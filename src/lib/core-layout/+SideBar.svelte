<script>
  import Logo from "./+Logo.svelte";
</script>

<nav>
  <div>
    <div class="logo">
      <Logo />
    </div>
    <button class="add">ADD +</button>
    <div class="links">
      <div class="link"><a>Overview</a></div>
      <div class="link"><a>Properties</a></div>
      <div class="link"><a>Banking</a></div>
      <div class="link"><a>Account</a></div>
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
      & > .links {
        & > .link {
          text-align: left;
          cursor: pointer;
          margin: 40px 0;
          color: #9b8cae;
          font-weight: 500;
          font-size: 1.25em;
        }
      }
    }
  }
</style>
