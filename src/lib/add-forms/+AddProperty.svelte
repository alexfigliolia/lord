<script lang="ts">
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { createPropertyMutation } from "$lib/graphql/properties.gql";
  import { NotificationState } from "$lib/state/Notifications";
  import { OrganizationState, organization } from "$lib/state/Organization";
  import { TaskQueue } from "@figliolia/task-queue";

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let propertyName = "";
  let propertyDescription = "";
  let propertyAddress1 = "";
  let propertyAddress2 = "";
  let city = "";
  let state = "";
  let zipCode = "";

  class UIController {
    static Queue = new TaskQueue();

    static baseValidator = (value: string) => {
      if (!value.length) {
        return null;
      }
      return value.length > 2;
    };

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      // TODO - validations
      loading = true;
      const request = new GraphQLRequest({
        query: createPropertyMutation,
        variables: {
          name: propertyName,
          description: propertyDescription,
          address_1: propertyAddress1,
          address_2: propertyAddress2,
          city: city,
          state: state,
          zip_code: zipCode,
          organization_id: $organization.id,
        },
      });
      const response = await request.send();
      const result = await response.json();
      console.log(JSON.stringify(result, null, 2));
      if (result?.errors?.length) {
        error = true;
      } else {
        complete = true;
        // @ts-ignore
        e.target?.reset();
        this.reset();
        OrganizationState.appendProperty(result.data.createProperty);
      }
      this.Queue.deferTask(() => {
        error = false;
        loading = false;
        complete = false;
      }, 2000);
      NotificationState.push({
        type: "success",
        message: `Your property has been created! You can register units and leases on properties page`,
      });
    };

    public static reset() {
      propertyName = "";
      propertyDescription = "";
      propertyAddress1 = "";
      propertyAddress2 = "";
      city = "";
      state = "";
      zipCode = "";
    }
  }
</script>

<h2>Add a Property</h2>
<form on:submit={UIController.onSubmit}>
  <AddInput
    name="propertyName"
    placeholder="property name"
    bind:value={propertyName}
    validator={UIController.baseValidator}
  />
  <AddInput
    name="propertyDescription"
    placeholder="Description (optional)"
    validator={UIController.baseValidator}
    bind:value={propertyDescription}
  />
  <h3>Address</h3>
  <AddInput
    name="propertyAddress1"
    placeholder="address line 1"
    bind:value={propertyAddress1}
    validator={UIController.baseValidator}
  />
  <AddInput
    name="propertyAddress2"
    placeholder="address line 2"
    bind:value={propertyAddress2}
    validator={UIController.baseValidator}
  />
  <AddInput
    name="city"
    placeholder="city"
    bind:value={city}
    validator={UIController.baseValidator}
  />
  <AddInput
    name="state"
    placeholder="state"
    bind:value={state}
    validator={UIController.baseValidator}
  />
  <AddInput
    name="zipCode"
    placeholder="zip code"
    bind:value={zipCode}
    validator={UIController.baseValidator}
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
