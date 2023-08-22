<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import type { ListItem } from "$lib/components/forms/types";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import { createLease } from "$lib/graphql/leases.gql";
  import type {
    CreateLease,
    CreateLeaseVariables,
    CreateLease_createLease,
  } from "$lib/schema/CreateLease";
  import { units, property } from "$lib/views/property/Stores";
  import type { UserFragment } from "$lib/schema/UserFragment";
  import DateInput from "$lib/components/forms/+DateInput.svelte";
  import AddMultiSelect from "$lib/components/forms/+AddMultiSelect.svelte";
  import { overviewOrganization } from "$lib/views/overview/Stores";

  export let lessors: UserFragment[];

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let end_date = "";
  let start_date = "";
  let amount: string = "";
  let unit: ListItem = { label: "", value: "" };
  let users: Record<number, ListItem> = {};

  class UIController {
    static Queue = new TaskQueue();

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      if (!this.validateAll()) {
        loading = false;
        error = false;
        return;
      }
      try {
        const lease = await this.createLease();
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(lease.data.createLease);
      } catch (err) {
        error = true;
      }
      this.Queue.deferTask(() => {
        error = false;
        loading = false;
        complete = false;
      }, 2000);
    };

    private static validateAll() {
      return (
        Validators.dateValidator(start_date) &&
        Validators.dateValidator(end_date) &&
        Validators.floatValidator(amount) &&
        typeof unit.value === "number" &&
        Object.keys(users).length
      );
    }

    private static createLease() {
      const request = new GraphQLRequest<CreateLease, CreateLeaseVariables>({
        query: createLease,
        variables: {
          amount: parseFloat(amount),
          unit_id: unit.value as number,
          property_id: $property.id,
          users: this.toIDList(users),
          end_date: this.toISO(end_date),
          start_date: this.toISO(start_date),
          organization_id: $overviewOrganization.id,
        },
      });
      return request.send();
    }

    private static toISO(date: string) {
      return new Date(date).toISOString();
    }

    private static toIDList(values: Record<number, ListItem>) {
      return Object.keys(values).map(l => parseInt(l));
    }

    private static onSuccess(lease: CreateLease_createLease) {
      complete = true;
      this.reset();
      units.update(v => {
        const copy = v.slice();
        for (const unit of copy) {
          if (unit.id === lease.unit_id) {
            unit.leases = [...unit.leases, lease];
            break;
          }
        }
        return copy;
      });
      NotificationState.push({
        type: "success",
        message: `Your new lease has been created! You can track payments on the leases page`,
      });
    }

    public static reset() {
      start_date = "";
      end_date = "";
      amount = "";
      unit = { label: "", value: "" };
      users = {};
    }
  }
</script>

<h2>Add a Lease to {$property.name}</h2>
<div class="new">Add current or past leases for each unit</div>
<form on:submit={UIController.onSubmit}>
  <h3>Duration</h3>
  <DateInput name="start_date" placeholder="start date" bind:value={start_date} />
  <DateInput name="end_date" placeholder="end date" bind:value={end_date} />
  <h3>Total Cost of Lease</h3>
  <AddInput
    name="amount"
    placeholder="amount"
    bind:value={amount}
    validator={Validators.floatValidator}
  />
  <h3>Ownership</h3>
  <AddDropDown
    name="unit"
    placeholder="unit"
    bind:value={unit}
    items={$units.map(unit => ({ label: unit.name, value: unit.id }))}
  />
  <AddMultiSelect
    name="users"
    placeholder="tenants"
    bind:value={users}
    items={lessors.map(user => ({ label: user.name, value: user.id }))}
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
    margin-bottom: 0.75em;
  }

  .new {
    color: rgb(155, 152, 158);
    margin: 0;
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
