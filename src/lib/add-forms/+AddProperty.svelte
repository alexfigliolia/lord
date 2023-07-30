<script lang="ts">
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import Notification from "$lib/components/notifications/+Notification.svelte";
  import Success from "$lib/components/notifications/+Success.svelte";
  import { createPropertyMutation } from "$lib/graphql/properties.gql";
  import { NotificationState } from "$lib/state/Notifications";
  import { organization } from "$lib/state/Organization";
  import { TaskQueue } from "@figliolia/task-queue";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  class UIController {
    static Queue = new TaskQueue();

    /* Inputs  */
    static propertyName = "";
    static propertyDescription = "";
    static propertyAddress1 = "";
    static propertyAddress2 = "";
    static city = "";
    static state = "";
    static zipCode = "";

    static onChange = (e: Event) => {
      if (e.target) {
        // @ts-ignore
        const { name, value } = e.target;
        // @ts-ignore
        this[name] = value;
      }
    };

    static baseValidator = (value: string) => {
      if (!value.length) {
        return null;
      }
      return value.length > 2;
    };

    static onSubmit = (e: Event) => {
      // loading = true;
      e.preventDefault();
      // const request = new GraphQLRequest({
      //   query: createPropertyMutation,
      //   variables: {
      //     name: this.propertyName,
      //     description: this.propertyDescription,
      //     address_1: this.propertyAddress1,
      //     address_2: this.propertyAddress2,
      //     city: this.city,
      //     state: this.state,
      //     zip_code: this.zipCode,
      //     organization_id: $organization.id,
      //   },
      // });
      // const response = await request.send();
      // const result = await response.json();
      // console.log(JSON.stringify(result, null, 2));
      // if (result?.errors?.length) {
      //   error = true;
      // } else {
      //   complete = true;
      // }
      // this.Queue.deferTask(() => {
      //   error = false;
      //   loading = false;
      //   complete = false;
      // }, 2000);
      NotificationState.push({
        type: "success",
        message: `Your property has been created! You can register units and leases on properties page`,
      });
    };
  }
</script>

<h2>Add a Property</h2>
<form>
  <AddInput
    type="text"
    name="propertyName"
    placeholder="property name"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <AddInput
    type="text"
    name="propertyDescription"
    placeholder="Description (optional)"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <h3>Address</h3>
  <AddInput
    type="text"
    name="propertyAddress1"
    placeholder="address line 1"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <AddInput
    type="text"
    name="propertyAddress2"
    placeholder="address line 2"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <AddInput
    type="text"
    name="city"
    placeholder="city"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <AddInput
    type="text"
    name="state"
    placeholder="state"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <AddInput
    type="number"
    name="zipCode"
    placeholder="zip code"
    onChange={UIController.onChange}
    validator={UIController.baseValidator}
  />
  <div class="action">
    <FormActionButton
      stateful
      {loading}
      {complete}
      {error}
      onSubmit={UIController.onSubmit}
      text="Create"
    />
  </div>
</form>

<style lang="scss">
  h2 {
    font-size: 1.75em;
    color: rgb(140, 140, 140);
    font-weight: 300;
  }
  form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    h3 {
      font-size: 1.5em;
      color: rgb(140, 140, 140);
      font-weight: 300;
    }
  }
  .action {
    margin-top: 20px;
  }
</style>
