<script lang="ts">
  import LogoLarge from "$lib/core-layout/+LogoLarge.svelte";
</script>

<section id="login">
  <div class="frame">
    <LogoLarge />
    <div class="form">
      <slot />
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
      }
    }
  }
</style>
