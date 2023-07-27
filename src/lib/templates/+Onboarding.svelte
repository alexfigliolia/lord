<script lang="ts">
  import Input from "$lib/components/+Input.svelte";
  import LogoLarge from "$lib/core-layout/+LogoLarge.svelte";
  import { LoginController, error } from "$lib/authentication/LoginController";
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
      & > .form {
        width: 90%;
        max-width: 450px;
      }
    }
  }
</style>
