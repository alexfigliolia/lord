<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import type { ListItem } from "$lib/components/forms/types";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import {
    CreateLinkedBankAccount,
    CreatePaymentMethod,
  } from "$lib/graphql/user-payment-methods.gql";
  import type {
    createLinkedBankAccount,
    createLinkedBankAccountVariables,
  } from "$lib/schema/createLinkedBankAccount";
  import { currentUser } from "$lib/state/User";
  import type {
    createPaymentMethod,
    createPaymentMethodVariables,
  } from "$lib/schema/createPaymentMethod";
  import { paymentMethods } from "$lib/views/residence/Stores";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let bankName = "";
  let accountNumber = "";
  let routingNumber = "";
  let expiration = "";
  let cardNumber = "";
  let cvv = "";
  let paymentType: ListItem = { label: "Bank Account", value: "bank account" };

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
        await this.createPaymentMethod();
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
      if (!Validators.baseValidator(paymentType.value as string)) {
        return false;
      }
      if (paymentType.value === "bank account") {
        return (
          Validators.baseValidator(bankName) &&
          Validators.baseValidator(routingNumber) &&
          Validators.baseValidator(accountNumber)
        );
      }
      return (
        Validators.baseValidator(cardNumber) &&
        Validators.baseValidator(expiration) &&
        Validators.baseValidator(cvv)
      );
    }

    private static async createPaymentMethod() {
      if (paymentType.value === "bank account") {
        const GQL = new GraphQLRequest<createLinkedBankAccount, createLinkedBankAccountVariables>({
          query: CreateLinkedBankAccount,
          variables: {
            account_number: accountNumber,
            name: bankName,
            routing: routingNumber,
            user_id: $currentUser.id,
          },
        });
        const account = await GQL.send();
        paymentMethods.update(v => {
          return {
            ...v,
            linked_bank_accounts: [...v.linked_bank_accounts, account.data.createLinkedBankAccount],
          };
        });
      }
      const GQL = new GraphQLRequest<createPaymentMethod, createPaymentMethodVariables>({
        query: CreatePaymentMethod,
        variables: {
          cvv,
          expiration,
          number: cardNumber,
          user_id: $currentUser.id,
        },
      });
      const card = await GQL.send();
      paymentMethods.update(v => {
        return {
          ...v,
          payment_methods: [...v.payment_methods, card.data.createPaymentMethod],
        };
      });
    }

    private static onSuccess() {
      complete = true;
      this.reset();
      NotificationState.push({
        type: "success",
        message: `Your payment method has been saved! You can use it to setup auto-pay and make payments on your leases`,
      });
    }

    public static reset() {
      bankName = "";
      accountNumber = "";
      routingNumber = "";
      cardNumber = "";
      expiration = "";
      paymentType = { label: "", value: "" };
    }
  }
</script>

<h2>Add a Payment Method</h2>
<form on:submit={UIController.onSubmit}>
  <AddDropDown
    name="paymentType"
    placeholder="type"
    bind:value={paymentType}
    items={[
      {
        label: "Bank Account",
        value: "bank account",
      },
      {
        label: "Debit or Credit Card",
        value: "debit or credit card",
      },
    ]}
  />
  <h3>Information</h3>
  {#if paymentType.value === "bank account"}
    <AddInput
      name="bankName"
      placeholder="bank name"
      bind:value={bankName}
      validator={Validators.baseValidator}
    />
    <AddInput
      name="accountNumber"
      placeholder="account number"
      bind:value={accountNumber}
      validator={Validators.baseValidator}
    />
    <AddInput name="routingNumber" placeholder="routing number" bind:value={routingNumber} />
  {:else}
    <AddInput
      name="cardNumber"
      placeholder="card number"
      bind:value={cardNumber}
      validator={Validators.baseValidator}
    />
    <AddInput
      name="expiration"
      placeholder="expiration"
      bind:value={expiration}
      validator={Validators.baseValidator}
    />
    <AddInput name="cvv" placeholder="CVV" bind:value={cvv} validator={Validators.baseValidator} />
  {/if}
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
