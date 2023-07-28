<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Input from "$lib/components/+Input.svelte";
  import { error } from "$lib/authentication/LoginController";
  import { goto } from "$app/navigation";
  import { SignUpController } from "./SignUpController";
  import Onboarding from "$lib/templates/+Onboarding.svelte";
  import PageSwitch, { type PageSwitch as PW } from "pageswitch";
  import { SignUpValidators } from "./SignUpValidators";

  const SignUp = new SignUpController();

  class UIController {
    static PW: PW;

    static initialize() {
      this.PW = new PageSwitch("panels", {
        duration: 600,
        direction: 1,
        start: 0,
        loop: false,
        ease: "ease",
        transition: "fade",
        mouse: false,
        mousewheel: false,
        arrowkey: false,
      });
    }

    static next() {
      if (SignUp.validateName() && SignUp.validateEmail() && SignUp.validatePassword()) {
        error.update(() => " ");
        this.PW.next();
      }
    }
  }

  const preventDefault = (e: Event) => {
    e.preventDefault();
  };

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (SignUp.validateBusinessName()) {
      error.update(() => " ");
      const response = await SignUp.submit();
      if (response?.errors?.length) {
        error.update(() => response.errors[0].message);
      } else {
        void goto("/app");
      }
    }
  };

  onMount(() => {
    if (browser) {
      UIController.initialize();
    }
    return () => {
      if (UIController.PW) {
        UIController.PW.destroy();
      }
      return error.set("");
    };
  });
</script>

<Onboarding>
  <div id="panels">
    <div class="panel">
      <h1>Sign Up</h1>
      <div class="new">Already a user? <a href="/login">Login In!</a></div>
      <form on:submit={preventDefault}>
        <Input
          type="text"
          name="name"
          placeholder="name"
          onChange={SignUp.onChange.bind(SignUp)}
          validator={SignUpValidators.validName.bind(SignUpValidators)}
        />
        <Input
          type="text"
          name="email"
          placeholder="email"
          onChange={SignUp.onChange.bind(SignUp)}
          validator={SignUpValidators.validEmail.bind(SignUpValidators)}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          onChange={SignUp.onChange.bind(SignUp)}
          validator={SignUpValidators.validPassword.bind(SignUpValidators)}
        />
        <button on:click={UIController.next.bind(UIController)}>Next</button>
      </form>
      <div class="error">{$error}</div>
    </div>
    <div class="panel">
      <h1>More about you</h1>
      <div class="new">Let's give a name to your business</div>
      <form on:submit={preventDefault}>
        <Input
          type="text"
          name="businessName"
          placeholder="business name"
          validator={SignUpValidators.validBusinessName.bind(SignUpValidators)}
          onChange={SignUp.onChange.bind(SignUp)}
        />
        <button on:click={onSubmit}>Create</button>
      </form>
      <div class="error">{$error}</div>
    </div>
  </div>
</Onboarding>

<style lang="scss">
  @use "$lib/variables.scss";

  #panels {
    width: 100%;
    position: relative;
    z-index: 1;
    min-height: 55vh;
  }

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
