<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import type { CreateInvitePayload } from "$lib/types/derived";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import type { ListItem } from "$lib/components/forms/types";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import { SignUpValidators } from "$lib/authentication/SignUpValidators";
  import { inviteUser } from "$lib/graphql/invites.gql";
  import { UserRole } from "$lib/types";
  import { NotificationState } from "$lib/state/Notifications";
  import { overviewOrganization } from "$lib/views/overview/Stores";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let name = "";
  let email = "";
  let role: ListItem = { label: "", value: "" };

  class UIController {
    static Queue = new TaskQueue();

    static roles: ListItem[] = Object.keys(UserRole).map(k => ({
      label: k,
      value: k.toLowerCase(),
    }));

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      if (!this.validateAll()) {
        loading = false;
        error = false;
        return;
      }
      const result = await this.createInvitation();
      this.Queue.deferTask(() => {
        error = false;
        loading = false;
        complete = false;
      }, 2000);
      if (result?.errors?.length) {
        error = true;
      } else {
        complete = true;
        NotificationState.push({
          type: "success",
          message: `We've sent an invite to ${name}! They will appear in your dashboard as soon as they sign up`,
        });
        // @ts-ignore
        e.target?.reset();
        this.reset();
      }
    };

    private static validateAll() {
      return (
        SignUpValidators.validName(name) &&
        SignUpValidators.validEmail(email) &&
        Validators.baseValidator(role.value as string)
      );
    }

    private static async createInvitation(): Promise<CreateInvitePayload> {
      const request = new GraphQLRequest({
        query: inviteUser,
        variables: {
          name,
          email,
          role: role.value,
          organization_id: $overviewOrganization.id,
          organization_name: $overviewOrganization.name,
        },
      });
      const response = await request.send();
      return response.json();
    }

    public static reset() {
      name = "";
      email = "";
      role = { label: "", value: "" };
    }
  }
</script>

<h2>Add a User</h2>
<div class="new">Add owners, employees, or residents of your property</div>
<form on:submit={UIController.onSubmit}>
  <AddInput
    name="name"
    placeholder="Name"
    bind:value={name}
    validator={SignUpValidators.validName}
  />
  <AddInput
    name="email"
    placeholder="email"
    bind:value={email}
    validator={SignUpValidators.validEmail}
  />
  <h3>Who are they?</h3>
  <AddDropDown name="role" placeholder="role" bind:value={role} items={UIController.roles} />
  <div class="action">
    <FormActionButton stateful {error} {loading} {complete} text="Create" />
  </div>
</form>

<style lang="scss">
  @use "$lib/variables";
  h2 {
    font-size: 1.75em;
    color: rgb(140, 140, 140);
    font-weight: 300;
    margin-bottom: 0.75em;
  }
  .new {
    color: rgb(155, 152, 158);
    margin-bottom: 2em;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      width: 100%;
      font-size: 1.5em;
      color: rgb(140, 140, 140);
      font-weight: 300;
    }
  }
  .action {
    width: 100%;
    margin-top: 20px;
    align-self: center;
    @include variables.center;
  }
</style>
