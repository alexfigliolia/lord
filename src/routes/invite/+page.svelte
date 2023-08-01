<script lang="ts">
  import { onMount } from "svelte";
  import LoginInput from "$lib/components/forms/+LoginInput.svelte";
  import { error } from "$lib/authentication/LoginController";
  import { SignUpValidators } from "$lib/authentication/SignUpValidators";
  import Onboarding from "$lib/views/onboarding/+Onboarding.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { writable } from "svelte/store";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import { InviteController } from "$lib/authentication/InviteController";
  import type { Invite } from "$lib/types/derived";

  const InviteFlow = new InviteController();

  export const openInvites = writable<Invite[]>([]);

  let loading = false;
  let complete = false;
  let buttonError = false;

  let invite: Invite | null = null;
  let organization: ListItem = { label: "", value: -1 };

  class UIController {
    static nextPage: () => void;
    static previousPage: () => void;

    static preventDefault = (e: Event) => {
      e.preventDefault();
    };

    public static onSubmit = async (e: Event) => {
      loading = true;
      e.preventDefault();
      if (
        !InviteFlow.validateName() ||
        !InviteFlow.validateEmail() ||
        !InviteFlow.validatePassword()
      ) {
        return this.buttonError();
      }
      error.set(" ");
      const response = await InviteFlow.findInvites();
      if (response?.errors?.length) {
        return this.buttonError(response.errors[0].message);
      }
      const invites = response?.data?.invites || [];
      if (!invites.length) {
        return this.buttonError(
          "We could not locate any pending invitations sent to this email address",
        );
      }
      complete = true;
      if (invites.length === 1) {
        await InviteFlow.acceptInvite(invites[0]);
        InviteFlow.redirect();
      } else {
        openInvites.set(invites);
        this.resetError();
        this.nextPage();
      }
    };

    public static onSelect = (_: ListItem, index: number) => {
      invite = $openInvites[index];
    };

    public static async selectInvite(e: Event) {
      loading = true;
      e.preventDefault();
      if (typeof organization.value !== "number" || organization.value === -1 || !invite) {
        return this.buttonError("Selecting an organization is required");
      }
      const response = await InviteFlow.acceptInvite(invite);
      if (response?.errors?.length) {
        return this.buttonError(response.errors[0].message);
      }
      complete = true;
      InviteFlow.redirect();
    }

    private static buttonError(message?: string) {
      buttonError = true;
      if (message) {
        error.set(message);
      }
      this.resetButtonState();
    }

    public static resetButtonState() {
      InviteFlow.Queue.deferTask(() => {
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
      InviteFlow.Queue.clearDeferredTasks();
    };
  });
</script>

<Onboarding
  minHeight="435px"
  bind:nextPage={UIController.nextPage}
  bind:previousPage={UIController.previousPage}
>
  <div class="panel">
    <h1>Welcome!</h1>
    <div class="new">
      If you already have an account, <a href="/login">Login In!</a> Your invitation will be in your
      notifications
    </div>
    <form on:submit={UIController.preventDefault}>
      <LoginInput
        type="text"
        name="name"
        placeholder="name"
        onChange={InviteFlow.onChange}
        validator={SignUpValidators.validName}
      />
      <LoginInput
        type="text"
        name="email"
        placeholder="email"
        onChange={InviteFlow.onChange}
        validator={SignUpValidators.validEmail}
      />
      <LoginInput
        name="password"
        type="password"
        placeholder="password"
        onChange={InviteFlow.onChange}
        validator={SignUpValidators.validPassword}
      />
      <FormActionButton onSubmit={UIController.onSubmit} text="Join" />
    </form>
    <div class="error">{$error}</div>
  </div>
  <div class="panel">
    <h1>Organizations</h1>
    <div class="new">Select an organization</div>
    <form on:submit={UIController.preventDefault}>
      <AddDropDown
        name="organization"
        placeholder="organization"
        bind:value={organization}
        onSelect={UIController.onSelect}
        items={$openInvites.map(v => ({ label: v.organization_name, value: v.organization_id }))}
      />
      <FormActionButton
        stateful
        {loading}
        {complete}
        text="Create"
        error={buttonError}
        onSubmit={UIController.selectInvite}
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
    line-height: 1.5;
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
