<script lang="ts">
  import AddTeam from "$lib/add-forms/+AddTeam.svelte";
  import Modal from "$lib/components/+Modal.svelte";
  import { addModalOpen } from "$lib/state/Add";

  class UIController {
    static onClose = () => {
      addModalOpen.set(false);
    };
  }
</script>

<Modal visible={$addModalOpen} onClose={UIController.onClose}>
  <div class="content">
    <h1>+ Team</h1>
    <AddTeam />
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
</style>
