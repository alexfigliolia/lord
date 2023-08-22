<script lang="ts">
  import { derived } from "svelte/store";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import type { ListItem } from "$lib/components/forms/types";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import { paymentMethods, residence } from "$lib/views/residence/Stores";
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
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
  let paymentMethod: ListItem = { label: "", value: "" };

  const allMethods = derived(paymentMethods, v => {
    return [...v.payment_methods, ...v.linked_bank_accounts];
  });

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
        const payment = await this.makePayment();
        if (payment) {
          // @ts-ignore
          residence.update(v => {
            if (v) {
              // @ts-ignore
              return { ...v, payments: [...v.payments, payment.data.createPayment] };
            }
            return v;
          });
        }
        // @ts-ignore
        e.target?.reset();
        this.onSuccess();
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
        Validators.floatValidator(amount) &&
        Validators.baseValidator(description) &&
        Validators.numberValidator(paymentMethod.value)
      );
    }

    private static makePayment() {
      if (!$residence) {
        return;
      }
      const GQL = new GraphQLRequest<CreatePayment, CreatePaymentVariables>({
        query: createPayment,
        variables: {
          user_id: $currentUser.id,
          amount: parseFloat(amount),
          unit_id: $residence.unit.id,
          property_id: $residence.property.id,
          description,
          payment_method_id: paymentMethod.value as number,
          organization_id: $residence.organization_id,
        },
      });
      return GQL.send();
    }

    private static onSuccess() {
      complete = true;
      this.reset();
      NotificationState.push({
        type: "success",
        message: `Your payment has been saved!`,
      });
    }

    public static reset() {
      amount = "";
      description = "";
      paymentMethod = { label: "", value: "" };
    }
  }
</script>

<h2>Make a Payment</h2>
<form on:submit={UIController.onSubmit}>
  <AddDropDown
    name="paymentMethod"
    placeholder="payment method"
    bind:value={paymentMethod}
    items={$allMethods.map(v => ({ label: v.name, value: v.id }))}
  />
  <AddInput
    name="amount"
    placeholder="amount"
    bind:value={amount}
    validator={Validators.floatValidator}
  />
  <AddInput
    name="description"
    placeholder="description"
    bind:value={description}
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
