<script lang="ts">
  import { browser } from "$app/environment";
  import AddExpense from "$lib/add-forms/+AddExpense.svelte";
  import AddLease from "$lib/add-forms/+AddLease.svelte";
  import AddPayment from "$lib/add-forms/+AddPayment.svelte";
  import AddUnit from "$lib/add-forms/+AddUnit.svelte";
  import AddUnitIssue from "$lib/add-forms/+AddUnitIssue.svelte";
  import Modal from "$lib/components/+Modal.svelte";
  import Tabs from "$lib/components/+Tabs.svelte";
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import { organizationLessors } from "$lib/graphql/organizations.gql";
  import type {
    OrganizationLessors,
    OrganizationLessorsVariables,
  } from "$lib/schema/OrganizationLessors";
  import type { UserFragment } from "$lib/schema/UserFragment";
  import { addModalOpen } from "$lib/state/Add";
  import { property } from "$lib/views/property/Stores";
  import { overviewOrganization } from "../overview/Stores";

  let users: UserFragment[] = [];

  let tab = 0;

  class UIController {
    static fetched = false;

    static onClose = () => {
      addModalOpen.set(false);
    };

    static onClickTab = (_: Event, index: number) => {
      tab = index;
    };

    static async loadUsers() {
      const GQL = new GraphQLRequest<OrganizationLessors, OrganizationLessorsVariables>({
        query: organizationLessors,
        variables: {
          id: $overviewOrganization.id,
        },
      });
      const lessors = await GQL.send();
      users = lessors.data.organizationLessors;
    }
  }

  $: if (browser && $addModalOpen && !UIController.fetched) {
    void UIController.loadUsers();
  }
</script>

<Modal visible={$addModalOpen} onClose={UIController.onClose}>
  <div class="content">
    <h1>+ {$property.name}</h1>
    <Tabs
      activeIndex={tab}
      onClick={UIController.onClickTab}
      tabs={["Unit", "Lease", "Issue", "Expense", "Payment"]}
    >
      {#if tab === 0}
        <div class="tab-content">
          <AddUnit propertyID={$property.id} />
        </div>
      {/if}
      {#if tab === 1}
        <div class="tab-content">
          <AddLease lessors={users} />
        </div>
      {/if}
      {#if tab === 2}
        <div class="tab-content">
          <AddUnitIssue property={$property} />
        </div>
      {/if}
      {#if tab === 3}
        <div class="tab-content">
          <AddExpense property={$property} />
        </div>
      {/if}
      {#if tab === 4}
        <div class="tab-content">
          <AddPayment property={$property} />
        </div>
      {/if}
    </Tabs>
  </div>
</Modal>

<style lang="scss">
  @use "$lib/variables.scss";
  .content {
    width: 90%;
    min-width: 90%;
    margin: auto;
    margin-bottom: 70px;
    @media #{variables.$mq-1350} {
      width: 80%;
      min-width: 80%;
    }
    h1 {
      font-size: 2.5em;
      text-shadow: 0px 1px 1px rgba(#000, 0.1);
      background: linear-gradient(to bottom, variables.$core, variables.$core2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 500;
    }
  }
  .tab-content {
    margin-top: 50px;
  }
</style>
