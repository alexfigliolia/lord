<script lang="ts">
  import { onMount } from "svelte";
  import LoginInput from "$lib/components/forms/+LoginInput.svelte";
  import { LoginController, error } from "$lib/authentication/LoginController";
  import { goto } from "$app/navigation";
  import Onboarding from "$lib/templates/+Onboarding.svelte";
  import { LoginValidators } from "$lib/authentication/LoginValidators";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { TaskQueue } from "@figliolia/task-queue";

  const Login = new LoginController();
  let loading = false;
  let complete = false;
  let buttonError = false;

  export class UIController {
    static Queue = new TaskQueue();
    public static onSubmit = async (e: Event) => {
      loading = true;
      e.preventDefault();
      if (!Login.validateEmail() || !Login.validatePassword()) {
        buttonError = true;
        this.resetButtonState();
        return;
      }
      error.update(() => " ");
      const response = await Login.submit();
      if (response?.errors?.length) {
        buttonError = true;
        error.update(() => response.errors[0].message);
        this.resetButtonState();
      } else {
        complete = true;
        this.Queue.deferTask(() => {
          void goto("/app");
        }, 1000);
      }
    };

    public static preventDefault = (e: Event) => {
      e.preventDefault();
    };

    public static resetError() {
      error.set("");
    }

    public static resetButtonState(duration = 2000) {
      this.Queue.deferTask(() => {
        loading = false;
        complete = false;
        buttonError = false;
      }, 2000);
    }
  }

  onMount(() => {
    return () => {
      UIController.resetError();
      UIController.Queue.clearDeferredTasks();
    };
  });
</script>

<Onboarding minHeight="375px">
  <div class="panel">
    <h1>Login</h1>
    <div class="new">Are you new here? <a href="/signup">Sign Up!</a></div>
    <form on:submit={UIController.preventDefault}>
      <LoginInput
        type="text"
        name="email"
        placeholder="email"
        onChange={Login.onChange}
        validator={LoginValidators.validEmail}
      />
      <LoginInput
        name="password"
        type="password"
        placeholder="password"
        onChange={Login.onChange}
        validator={LoginValidators.validPassword}
      />
      <FormActionButton
        stateful
        {loading}
        {complete}
        text="Login"
        error={buttonError}
        onSubmit={UIController.onSubmit}
      />
    </form>
    <div class="error">{$error}</div>
  </div>
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
    display: flex;
    flex-direction: column;
  }
  .error {
    height: 40px;
    width: 100%;
    margin-top: 20px;
    @include variables.center;
    color: variables.$core;
    font-style: italic;
  }
</style>
