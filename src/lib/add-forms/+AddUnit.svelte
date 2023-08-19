<script lang="ts">
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import AddInput from "$lib/components/forms/+AddInput.svelte";
  import FormActionButton from "$lib/components/forms/+FormActionButton.svelte";
  import { TaskQueue } from "@figliolia/task-queue";
  import { Validators } from "./Validators";
  import { NotificationState } from "$lib/state/Notifications";
  import { createUnit } from "$lib/graphql/unit.gql";
  import type { CreateUnit, CreateUnitVariables } from "$lib/schema/CreateUnit";
  import { property, units } from "$lib/views/property/Stores";

  export let propertyID: number;

  /* Loading States */
  let error = false;
  let loading = false;
  let complete = false;

  /* Inputs  */
  let name = "";
  let description = "";

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
        await this.createUnit();
        NotificationState.push({
          type: "success",
          message: `${name} was created successfully! You can add any leases using the leases tab`,
        });
        complete = true;
        // @ts-ignore
        e.target?.reset();
        this.reset();
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
      return Validators.baseValidator(name) && Validators.baseValidator(description);
    }

    private static async createUnit() {
      const request = new GraphQLRequest<CreateUnit, CreateUnitVariables>({
        query: createUnit,
        variables: {
          name,
          description,
          property_id: propertyID,
        },
      });
      const unit = await request.send();
      units.update(v => [unit.data.createUnit, ...v]);
    }

    public static reset() {
      name = "";
      description = "";
    }
  }
</script>

<h2>Add a Unit to {$property.name}</h2>
<div class="new">Add all rentable spaces</div>
<form on:submit={UIController.onSubmit}>
  <AddInput name="name" placeholder="Name" bind:value={name} validator={Validators.baseValidator} />
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
    margin-bottom: 0.75em;
  }
  .new {
    color: rgb(155, 152, 158);
    margin-bottom: 2em;
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
