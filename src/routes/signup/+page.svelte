<script lang="ts">
  import { onMount } from "svelte";
  import LoginInput from "$lib/components/forms/+LoginInput.svelte";
  import { error } from "$lib/authentication/LoginController";
  import { SignUpController } from "$lib/authentication/SignUpController";
  import Onboarding from "$lib/views/onboarding/+Onboarding.svelte";
  import { SignUpValidators } from "$lib/authentication/SignUpValidators";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";

  const SignUp = new SignUpController();

  let loading = false;
  let complete = false;
  let buttonError = false;

  class UIController {
    static nextPage: () => void;
    static previousPage: () => void;

    static next = (_: Event) => {
      if (SignUp.validateName() && SignUp.validateEmail() && SignUp.validatePassword()) {
        this.resetError();
        this.nextPage();
      }
    };

    static preventDefault = (e: Event) => {
      e.preventDefault();
    };

    static onSubmit = async (e: Event) => {
      loading = true;
      e.preventDefault();
      if (!SignUp.validateBusinessName()) {
        return this.buttonError();
      }
      this.resetError();
      const response = await SignUp.submit();
      if (response?.errors?.length) {
        this.buttonError(response.errors[0].message);
        return this.previousPage();
      }
      complete = true;
      SignUp.redirect();
    };

    private static buttonError(message?: string) {
      buttonError = true;
      if (message) {
        error.set(message);
      }
      this.resetButtonState();
    }

    public static resetButtonState() {
      SignUp.Queue.deferTask(() => {
        loading = false;
        complete = false;
        buttonError = false;
      }, 2000);
    }

    public static resetError() {
      error.set(" ");
    }
  }

  onMount(() => {
    return () => {
      UIController.resetError();
      SignUp.Queue.clearDeferredTasks();
    };
  });
</script>

<Onboarding
  minHeight="435px"
  bind:nextPage={UIController.nextPage}
  bind:previousPage={UIController.previousPage}
>
  <div class="panel">
    <h1>Sign Up</h1>
    <div class="new">Already a user? <a href="/login">Login In!</a></div>
    <form on:submit={UIController.preventDefault}>
      <LoginInput
        type="text"
        name="name"
        placeholder="name"
        onChange={SignUp.onChange}
        validator={SignUpValidators.validName}
      />
      <LoginInput
        type="text"
        name="email"
        placeholder="email"
        onChange={SignUp.onChange}
        validator={SignUpValidators.validEmail}
      />
      <LoginInput
        name="password"
        type="password"
        placeholder="password"
        onChange={SignUp.onChange}
        validator={SignUpValidators.validPassword}
      />
      <FormActionButton onSubmit={UIController.next} text="Next" />
    </form>
    <div class="error">{$error}</div>
  </div>
  <div class="panel">
    <h1>More about you</h1>
    <div class="new">Let's give a name to your business</div>
    <form on:submit={UIController.onSubmit}>
      <LoginInput
        type="text"
        name="businessName"
        placeholder="business name"
        validator={SignUpValidators.validBusinessName}
        onChange={SignUp.onChange}
      />
      <FormActionButton
        stateful
        {loading}
        {complete}
        text="Create"
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
