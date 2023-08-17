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
  import type { FindInvitations_invites } from "$lib/schema/FindInvitations";

  const InviteFlow = new InviteController();

  const openInvites = writable<FindInvitations_invites[]>([]);

  let loading = false;
  let complete = false;
  let buttonError = false;

  let invite: FindInvitations_invites | null = null;
  let organization: ListItem = { label: "", value: "" };

  class UIController {
    static nextPage: () => void;
    static previousPage: () => void;

    static preventDefault = (e: Event) => {
      e.preventDefault();
    };

    public static onSubmit = async (e: Event) => {
      loading = true;
      e.preventDefault();
      if (!InviteFlow.validateAll()) {
        return this.onError();
      }
      error.set(" ");
      try {
        const response = await InviteFlow.findInvites();
        const invites = response?.data?.invites || [];
        if (!invites.length) {
          return this.onError(
            "We could not locate any pending invitations sent to this email address",
          );
        }
        if (invites.length === 1) {
          await InviteFlow.acceptInvite(invites[0]);
          complete = true;
          InviteFlow.redirect();
        } else {
          openInvites.set(invites);
          loading = false;
          this.resetError();
          this.nextPage();
        }
      } catch (err: any) {
        this.onError(err.message);
      }
    };

    public static onSelect = (_: ListItem, index: number) => {
      invite = $openInvites[index];
    };

    public static selectInvite = async (e: Event) => {
      loading = true;
      e.preventDefault();
      if (typeof organization.value !== "number" || !invite) {
        return this.onError("Selecting an organization is required");
      }
      const response = await InviteFlow.acceptInvite(invite);
      // @ts-ignore
      if (response?.errors?.length) {
        // @ts-ignore
        return this.onError(response.errors[0].message);
      }
      complete = true;
      InviteFlow.redirect();
    };

    private static onError(message?: string) {
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
        bind:value={organization}
        placeholder="organization"
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
    text-align: center;
    color: #9e91fc;
    line-height: 1.5;
  }
</style>
