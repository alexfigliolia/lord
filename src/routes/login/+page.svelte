<script lang="ts">
  import { onMount } from "svelte";
  import LoginInput from "$lib/components/+LoginInput.svelte";
  import { LoginController, error } from "$lib/authentication/LoginController";
  import { goto } from "$app/navigation";
  import Onboarding from "$lib/templates/+Onboarding.svelte";
  import { LoginValidators } from "$lib/authentication/LoginValidators";
  import FormActionButton from "$lib/components/+FormActionButton.svelte";

  const Login = new LoginController();

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (Login.validateEmail() && Login.validatePassword()) {
      error.update(() => " ");
      const response = await Login.submit();
      if (response?.errors?.length) {
        error.update(() => response.errors[0].message);
      } else {
        void goto("/app");
      }
    }
  };

  onMount(() => {
    return () => {
      error.set("");
    };
  });
</script>

<Onboarding>
  <h1>Login</h1>
  <div class="new">Are you new here? <a href="/signup">Sign Up!</a></div>
  <form on:submit={onSubmit}>
    <LoginInput
      type="text"
      name="email"
      placeholder="email"
      onChange={Login.onChange.bind(Login)}
      validator={LoginValidators.validEmail.bind(LoginValidators)}
    />
    <LoginInput
      name="password"
      type="password"
      placeholder="password"
      onChange={Login.onChange.bind(Login)}
      validator={LoginValidators.validPassword.bind(LoginValidators)}
    />
    <FormActionButton {onSubmit} text="Login" />
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
  }
  .error {
    height: 40px;
    width: 100%;
    @include variables.center;
    color: variables.$core;
    font-style: italic;
  }
</style>
