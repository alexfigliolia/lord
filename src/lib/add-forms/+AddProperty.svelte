<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { createPropertyMutation } from "$lib/graphql/properties.gql";
  import { NotificationState } from "$lib/state/Notifications";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import type { ListItem } from "$lib/components/forms/types";
  import { StaticLists } from "./StaticLists";
  import AddDropDown from "$lib/components/forms/+AddDropDown.svelte";
  import { overviewOrganization, overviewProperties } from "$lib/views/overview/Stores";
  import type { CreateProperty, CreatePropertyVariables } from "$lib/schema/CreateProperty";
  import type { PropertyByID_propertyUI } from "$lib/schema/PropertyByID";

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
  let state: ListItem = { label: "", value: "" };
  let zipCode = "";

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
        const result = await this.createProperty();
        // @ts-ignore
        e.target?.reset();
        this.onSuccess(result.data.createProperty);
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
        Validators.baseValidator(propertyName) &&
        Validators.validateAddress(propertyAddress1) &&
        Validators.validateState(state.value as string) &&
        Validators.baseValidator(city) &&
        Validators.validateZipCode(zipCode)
      );
    }

    private static createProperty() {
      const request = new GraphQLRequest<CreateProperty, CreatePropertyVariables>({
        query: createPropertyMutation,
        variables: {
          name: propertyName,
          description: propertyDescription,
          address_1: propertyAddress1,
          address_2: propertyAddress2,
          city: city,
          state: state.value as string,
          zip_code: zipCode,
          organization_id: $overviewOrganization.id,
        },
      });
      return request.send();
    }

    private static onSuccess(property: PropertyByID_propertyUI) {
      complete = true;
      this.reset();
      overviewProperties.update(v => [...v, property]);
      NotificationState.push({
        type: "success",
        message: `Your property has been created! You can register units and leases on property's page`,
      });
    }

    public static reset() {
      propertyName = "";
      propertyDescription = "";
      propertyAddress1 = "";
      propertyAddress2 = "";
      city = "";
      state = { label: "", value: "" };
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
  <AddDropDown name="state" placeholder="state" bind:value={state} items={StaticLists.states} />
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
