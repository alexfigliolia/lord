<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import { organizations } from "$lib/state/Organization";
  import { createOrganization } from "$lib/graphql/organizations.gql";
  import { currentUser } from "$lib/state/User";
  import { get } from "svelte/store";
  import type {
    CreateOrganization,
    CreateOrganizationVariables,
    CreateOrganization_createOrganization,
  } from "$lib/schema/CreateOrganization";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let teamName = "";

  class UIController {
    static Queue = new TaskQueue();

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      if (!Validators.baseValidator(teamName)) {
        loading = false;
        error = false;
        return;
      }
      const result = await this.createProperty();
      this.Queue.deferTask(() => {
        error = false;
        loading = false;
        complete = false;
      }, 2000);
      // @ts-ignore
      if (result?.errors?.length) {
        error = true;
      } else {
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(result.data.createOrganization);
      }
    };

    private static createProperty() {
      const request = new GraphQLRequest<CreateOrganization, CreateOrganizationVariables>({
        query: createOrganization,
        variables: {
          name: teamName,
          owner_id: get(currentUser).id,
        },
      });
      return request.send();
    }

    private static onSuccess(organization: CreateOrganization_createOrganization) {
      complete = true;
      teamName = "";
      organizations.update(v => [...v, organization]);
      NotificationState.push({
        type: "success",
        message:
          "Your team has been created. You can add teammates, properties and more by visiting its page",
      });
    }
  }
</script>

<h2>Add a Team</h2>
<form on:submit={UIController.onSubmit}>
  <AddInput
    name="teamName"
    placeholder="team name"
    bind:value={teamName}
    validator={Validators.baseValidator}
  />
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
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .action {
    width: 100%;
    margin-top: 20px;
    align-self: center;
    @include variables.center;
  }
</style>
