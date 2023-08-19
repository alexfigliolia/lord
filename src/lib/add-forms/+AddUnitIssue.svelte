<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { currentUser } from "$lib/state/User";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import { createIssueMutation } from "$lib/graphql/issues.gql";
  import { overviewUsers, overviewIssues, overviewOrganization } from "$lib/views/overview/Stores";
  import type {
    CreateIssue,
    CreateIssueVariables,
    CreateIssue_createIssue,
  } from "$lib/schema/CreateIssue";
  import type { IssueType } from "$lib/schema/globalTypes";
  import type { PropertyByID_property } from "$lib/schema/PropertyByID";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let title = "";
  let description = "";
  let type: ListItem = { value: "", label: "" };
  let unit: ListItem = { value: "", label: "" };
  let assigned: ListItem = { value: "", label: "" };

  export let property: PropertyByID_property;

  class UIController {
    static clearUnit: () => void;
    static Queue = new TaskQueue();

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      try {
        const result = await this.createIssue();
        this.Queue.deferTask(() => {
          error = false;
          loading = false;
          complete = false;
        }, 2000);
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(result?.data?.createIssue);
      } catch (requestError) {
        error = true;
      }
    };

    private static createIssue() {
      const request = new GraphQLRequest<CreateIssue, CreateIssueVariables>({
        query: createIssueMutation,
        variables: {
          title,
          description,
          author: $currentUser.name,
          type: this.parseListItem(type) as IssueType,
          unit_id: this.parseNumericListItem(unit),
          organization_id: $overviewOrganization.id,
          assigned_id: this.parseNumericListItem(assigned),
          property_id: property.id,
        },
      });
      return request.send();
    }

    private static parseNumericListItem({ value }: ListItem) {
      if (typeof value === "number") {
        return value;
      }
      if (typeof value === "string" && !!value) {
        return parseInt(value);
      }
      return undefined;
    }

    private static parseListItem({ value }: ListItem) {
      if (typeof value === "string" && !!value) {
        return value;
      }
      return undefined;
    }

    private static onSuccess(issue: CreateIssue_createIssue) {
      complete = true;
      this.reset();
      overviewIssues.update(v => [issue, ...v]);
      NotificationState.push({
        type: "success",
        message: "Your Issue has been created!",
      });
    }

    public static reset() {
      title = "";
      description = "";
      type = { value: "", label: "" };
      unit = { value: "", label: "" };
      assigned = { value: "", label: "" };
    }
  }
</script>

<h2>Log an Issue at {property.name}</h2>
<form on:submit={UIController.onSubmit}>
  <AddInput
    name="title"
    placeholder="title"
    bind:value={title}
    validator={Validators.baseValidator}
  />
  <AddInput
    name="description"
    placeholder="Description"
    bind:value={description}
    validator={Validators.baseValidator}
  />
  <h3>Classification</h3>
  <AddDropDown
    name="unit"
    bind:clear={UIController.clearUnit}
    placeholder="Unit (Optional)"
    bind:value={unit}
    items={property.units.map(v => ({ label: v.name, value: v.id }))}
  />
  <AddDropDown
    name="type"
    placeholder="Type"
    bind:value={type}
    items={[
      { label: "Fix", value: "fix" },
      { label: "Complaint", value: "complaint" },
      { label: "Consultation", value: "consultation" },
    ]}
  />
  <h3>Assignment</h3>
  <AddDropDown
    name="assigned"
    placeholder="Assign to (Optional)"
    bind:value={assigned}
    items={$overviewUsers.map(u => ({ label: u.name, value: u.id }))}
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
