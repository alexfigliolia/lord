<script lang="ts">
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { createPropertyMutation } from "$lib/graphql/properties.gql";
  import { NotificationState } from "$lib/state/Notifications";
  import { OrganizationState, organization } from "$lib/state/Organization";
  import { properties } from "$lib/state/Properties";
  import { currentUser, users } from "$lib/state/User";
  import type { Issue, CreateIssuePayload } from "$lib/types/derived";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import { derived, writable } from "svelte/store";
  import { createIssueMutation } from "$lib/graphql/issues.gql";

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
  let property: ListItem = { value: "", label: "" };

  const activeProperty = writable<number | null>(null);
  const units = derived(activeProperty, v => {
    if (typeof v === "number") {
      return $properties[v].units;
    }
    return [];
  });

  class UIController {
    static Queue = new TaskQueue();

    public static onSelectProperty = (_: ListItem, index: number) => {
      if (typeof index === "number") {
        activeProperty.set(index);
      } else {
        activeProperty.set(null);
      }
    };

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      const result = await this.createIssue();
      this.Queue.deferTask(() => {
        error = false;
        loading = false;
        complete = false;
      }, 2000);
      if (result?.errors?.length) {
        error = true;
      } else {
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(result.data.createIssue);
      }
    };

    private static async createIssue(): Promise<CreateIssuePayload> {
      const request = new GraphQLRequest({
        query: createIssueMutation,
        variables: {
          title,
          description,
          author: $currentUser.name,
          organization_id: $organization.id,
          type: this.parseListItem(type),
          unit_id: this.parseNumericListItem(unit),
          assigned_id: this.parseNumericListItem(assigned),
          property_id: this.parseNumericListItem(property),
        },
      });
      const response = await request.send();
      return response.json();
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

    private static onSuccess(issue: Issue) {
      complete = true;
      this.reset();
      OrganizationState.appendIssue(issue);
      NotificationState.push({
        type: "success",
        message: `Your Issue has been created!`,
      });
    }

    public static reset() {
      title = "";
      description = "";
      type = { value: "", label: "" };
      unit = { value: "", label: "" };
      assigned = { value: "", label: "" };
      property = { value: "", label: "" };
    }
  }
</script>

<h2>Log an Issue</h2>
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
    name="property"
    placeholder="Property"
    bind:value={property}
    onSelect={UIController.onSelectProperty}
    items={$properties.map(v => ({ label: v.name, value: v.id }))}
  />
  <AddDropDown
    name="unit"
    placeholder="Unit (Optional)"
    bind:value={unit}
    items={$units.map(v => ({ label: v.name, value: v.id }))}
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
    items={$users.map(u => ({ label: u.name, value: u.id }))}
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
