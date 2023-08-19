<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import type { ListItem } from "$lib/components/forms/types";
  import type { PropertyByID_property } from "$lib/schema/PropertyByID";
  import { units } from "$lib/views/property/Stores";
  import { createPayment } from "$lib/graphql/payment.gql";
  import type { CreatePayment, CreatePaymentVariables } from "$lib/schema/CreatePayment";
  import { currentUser } from "$lib/state/User";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let amount: string = "";
  let description: string = "";
  let unit: ListItem = { value: "", label: "" };

  export let property: PropertyByID_property;

  class UIController {
    static clearUnit: () => void;
    static Queue = new TaskQueue();

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      try {
        await this.createExpense();
        this.Queue.deferTask(() => {
          error = false;
          loading = false;
          complete = false;
        }, 2000);
        // @ts-ignore
        e.target?.reset();
        this.onSuccess();
      } catch (requestError) {
        error = true;
      }
    };

    private static createExpense() {
      const request = new GraphQLRequest<CreatePayment, CreatePaymentVariables>({
        query: createPayment,
        variables: {
          description,
          user_id: $currentUser.id,
          property_id: property.id,
          amount: parseFloat(amount),
          unit_id: this.parseListItem(unit) as number,
        },
      });
      return request.send();
    }

    private static parseListItem({ value }: ListItem) {
      if (typeof value === "number") {
        return value;
      }
      return undefined;
    }

    private static onSuccess() {
      complete = true;
      this.reset();
      NotificationState.push({
        type: "success",
        message:
          "Your Payment has been created! The payment's total will influence all relevant graphs",
      });
    }

    public static reset() {
      amount = "";
      description = "";
      unit = { value: "", label: "" };
    }
  }
</script>

<h2>Log a Payment at {property.name}</h2>
<form on:submit={UIController.onSubmit}>
  <AddInput
    bind:value={description}
    placeholder="Description"
    name="payment_description"
    validator={Validators.baseValidator}
  />
  <AddInput
    bind:value={amount}
    placeholder="amount"
    name="payment_amount"
    validator={Validators.floatValidator}
  />
  <h3>Classification</h3>
  <AddDropDown
    name="unit"
    bind:clear={UIController.clearUnit}
    placeholder="Unit"
    bind:value={unit}
    items={$units.map(u => ({ label: u.name, value: u.id }))}
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
