<script lang="ts">
  import Input from "$lib/components/+Input.svelte";
  import { LoginController, error } from "$lib/authentication/LoginController";
  import { goto } from "$app/navigation";
  import Onboarding from "$lib/templates/+Onboarding.svelte";

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (LoginController.validateEmail() && LoginController.validatePassword()) {
      error.update(() => " ");
      const response = await LoginController.submit();
      if (response?.errors?.length) {
        error.update(() => response.errors[0].message);
      } else {
        goto("/app");
      }
    }
  };
</script>

<Onboarding>
  <h1>Login</h1>
  <div class="new">Are you new here? <a href="/signup">Sign Up!</a></div>
  <form on:submit={onSubmit}>
    <Input
      type="text"
      name="email"
      placeholder="email"
      valid={LoginController.validEmail}
      onChange={LoginController.onChange.bind(LoginController)}
    />
    <Input
      name="password"
      type="password"
      placeholder="password"
      valid={LoginController.validPassword}
      onChange={LoginController.onChange.bind(LoginController)}
    />
    <button on:click={onSubmit}>Login</button>
  </form>
  <div class="error">{$error}</div>
</Onboarding>

<style lang="scss">
  @use "$lib/variables.scss";
  h1 {
    font-size: 2.5em;
    color: rgb(155, 152, 158);
    font-weight: 300;
    margin-bottom: 20px;
  }
  .new {
    color: rgb(155, 152, 158);
    margin-bottom: 20px;
    & > a {
      font-weight: 700;
      color: rgb(155, 152, 158);
    }
  }
  form {
    width: 100%;
    & > button {
      background-color: variables.$core;
      border-radius: 25px;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      height: 50px;
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      color: #fff;
      text-transform: uppercase;
      font-weight: 700;
      transition-duration: 0.3s;
      box-shadow: 0px 5px 10px rgba(variables.$core, 0.95);
      &:hover,
      &:focus {
        box-shadow: 0px 10px 20px rgba(variables.$core, 0.95);
        transform: scale(1.025);
      }
    }
  }
  .error {
    height: 40px;
    width: 100%;
    @include variables.center;
    color: variables.$core;
    font-style: italic;
  }
</style>
