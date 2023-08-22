<script lang="ts">
  import AddMakePayment from "$lib/add-forms/+AddMakePayment.svelte";
  import AddPaymentMethod from "$lib/add-forms/+AddPaymentMethod.svelte";
  import Modal from "$lib/components/+Modal.svelte";
  import Tabs from "$lib/components/+Tabs.svelte";
  import { addModalOpen, tab } from "$lib/state/Add";
  import { currentUser } from "$lib/state/User";

  class UIController {
    public static onClose = () => {
      addModalOpen.set(false);
      tab.set(0);
    };

    public static onClickTab = (_: Event, index: number) => {
      tab.set(index);
    };
  }
</script>

<Modal visible={$addModalOpen} onClose={UIController.onClose}>
  <div class="content">
    <h1>+ {$currentUser.name}</h1>
    <Tabs
      activeIndex={$tab}
      onClick={UIController.onClickTab}
      tabs={["Make Payment", "Payment Method"]}
    >
      {#if $tab === 0}
        <div class="tab-content">
          <AddMakePayment />
        </div>
      {/if}
      {#if $tab === 1}
        <div class="tab-content">
          <AddPaymentMethod />
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
