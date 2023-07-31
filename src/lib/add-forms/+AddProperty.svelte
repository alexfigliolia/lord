<script lang="ts">
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { createPropertyMutation } from "$lib/graphql/properties.gql";
  import { NotificationState } from "$lib/state/Notifications";
  import { organization } from "$lib/state/Organization";
  import { OrganizationState } from "$lib/state/OrgManager";
  import type { Property, CreatePropertyPayload } from "$lib/types/derived";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";

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

    static onSubmit = async (e: Event) => {
      e.preventDefault();
      loading = true;
      const result = await this.createProperty();
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
        this.onSuccess(result.data.createProperty);
      }
    };

    private static async createProperty(): Promise<CreatePropertyPayload> {
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
      return response.json();
    }

    private static onSuccess(property: Property) {
      complete = true;
      this.reset();
      OrganizationState.appendProperty(property);
      NotificationState.push({
        type: "success",
        message: `Your property has been created! You can register units and leases on properties page`,
      });
    }

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
    validator={Validators.baseValidator}
  />
  <AddInput
    name="propertyDescription"
    placeholder="Description (optional)"
    bind:value={propertyDescription}
  />
  <h3>Address</h3>
  <AddInput
    name="propertyAddress1"
    placeholder="address line 1"
    bind:value={propertyAddress1}
    validator={Validators.validateAddress}
  />
  <AddInput
    name="propertyAddress2"
    placeholder="address line 2"
    bind:value={propertyAddress2}
    validator={Validators.validateAddress}
  />
  <AddInput name="city" placeholder="city" bind:value={city} validator={Validators.baseValidator} />
  <AddInput
    name="state"
    placeholder="state"
    bind:value={state}
    validator={Validators.validateState}
  />
  <AddInput
    name="zipCode"
    placeholder="zip code"
    bind:value={zipCode}
    validator={Validators.validateZipCode}
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
