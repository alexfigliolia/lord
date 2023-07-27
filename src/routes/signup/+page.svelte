<script lang="ts">
  import Input from "$lib/components/+Input.svelte";
  import LogoLarge from "$lib/core-layout/+LogoLarge.svelte";
  import { error } from "$lib/authentication/LoginController";
  import { goto } from "$app/navigation";
  import { SignUpController } from "./SignUpController";

  const onSubmit = async (e: Event) => {
    e.preventDefault();
    if (
      SignUpController.validateName() &&
      SignUpController.validateEmail() &&
      SignUpController.validatePassword()
    ) {
      error.update(() => " ");
      const response = await SignUpController.submit();
      if (response?.errors?.length) {
        error.update(() => response.errors[0].message);
      } else {
        goto("/app");
      }
    }
  };
</script>

<section id="login">
  <div class="frame">
    <LogoLarge />
    <div class="form">
      <h1>Sign Up</h1>
      <div class="new">Already a user? <a href="/login">Login In!</a></div>
      <form on:submit={onSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="name"
          valid={SignUpController.validName}
          onChange={SignUpController.onChange.bind(SignUpController)}
        />
        <Input
          type="text"
          name="email"
          placeholder="email"
          valid={SignUpController.validEmail}
          onChange={SignUpController.onChange.bind(SignUpController)}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          valid={SignUpController.validPassword}
          onChange={SignUpController.onChange.bind(SignUpController)}
        />
        <button on:click={onSubmit}>Sign Up</button>
      </form>
      <div class="error">{$error}</div>
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
        & > h1 {
          font-size: 2.5em;
          color: rgb(155, 152, 158);
          font-weight: 300;
          margin-bottom: 20px;
        }
        & > .new {
          color: rgb(155, 152, 158);
          margin-bottom: 20px;
          & > a {
            font-weight: 700;
            color: rgb(155, 152, 158);
          }
        }
        & > form {
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
        & > .error {
          height: 40px;
          width: 100%;
          @include variables.center;
          color: variables.$core;
          font-style: italic;
        }
      }
    }
  }
</style>
