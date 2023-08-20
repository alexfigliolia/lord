<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import { overviewOrganization } from "$lib/views/overview/Stores";
  import type { ExpenseCategory } from "$lib/schema/globalTypes";
  import { createExpenseMutation } from "$lib/graphql/expense.gql";
  import type {
    CreateExpense,
    CreateExpenseVariables,
    CreateExpense_createExpense,
  } from "$lib/schema/CreateExpense";
  import type { PropertyByID_propertyUI } from "$lib/schema/PropertyByID";
  import { expenses } from "$lib/views/property/Stores";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let description = "";
  let category: ListItem = { value: "", label: "" };
  let amount: string = "";

  export let property: PropertyByID_propertyUI;

  class UIController {
    static clearUnit: () => void;
    static Queue = new TaskQueue();

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      try {
        const data = await this.createExpense();
        this.Queue.deferTask(() => {
          error = false;
          loading = false;
          complete = false;
        }, 2000);
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(data.data.createExpense);
      } catch (requestError) {
        error = true;
      }
    };

    private static createExpense() {
      const request = new GraphQLRequest<CreateExpense, CreateExpenseVariables>({
        query: createExpenseMutation,
        variables: {
          description,
          property_id: property.id,
          amount: parseFloat(amount),
          organization_id: $overviewOrganization.id,
          category: this.parseListItem(category) as ExpenseCategory,
        },
      });
      return request.send();
    }

    private static parseListItem({ value }: ListItem) {
      if (typeof value === "string" && !!value) {
        return value;
      }
      return undefined;
    }

    private static onSuccess(expense: CreateExpense_createExpense) {
      complete = true;
      this.reset();
      expenses.update(v => [expense, ...v]);
      NotificationState.push({
        type: "success",
        message:
          "Your Expense has been created! The expense's total will influence all relevant graphs",
      });
    }

    public static reset() {
      description = "";
      category = { value: "", label: "" };
      amount = "";
    }
  }
</script>

<h2>Log an Expense at {property.name}</h2>
<form on:submit={UIController.onSubmit}>
  <AddInput
    name="description"
    placeholder="Description"
    bind:value={description}
    validator={Validators.baseValidator}
  />
  <AddInput
    name="amount"
    placeholder="amount"
    bind:value={amount}
    validator={Validators.floatValidator}
  />
  <h3>Classification</h3>
  <AddDropDown
    name="category"
    bind:clear={UIController.clearUnit}
    placeholder="Category"
    bind:value={category}
    items={[
      { label: "Hardware", value: "hardware" },
      { label: "Labor", value: "labor" },
      { label: "Management", value: "management" },
    ]}
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
