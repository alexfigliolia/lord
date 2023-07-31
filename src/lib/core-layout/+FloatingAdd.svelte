<script lang="ts">
  import Plus from "$lib/icons/+Plus.svelte";
  import { addModalOpen } from "$lib/state/Add";

  class UIController {
    public static openModal = () => {
      addModalOpen.set(true);
    };
  }
</script>

<button class="create" on:click={UIController.openModal}>
  <Plus color="#fff" />
</button>

<style lang="scss">
  @use "$lib/variables.scss";
  .create {
    position: fixed;
    bottom: 5vw;
    right: 5vw;
    outline: none;
    border: none;
    padding: 0;
    height: 70px;
    width: 70px;
    z-index: 9997;
    border-radius: 50%;
    box-shadow: 0px 2.5px 10px rgba(#000, 0.3);
    cursor: pointer;
    background: linear-gradient(to bottom, variables.$core, variables.$core2);
    color: #fff;
    transition-duration: 0.3s;
    &:hover {
      transform: scale(1.1);
    }
    @media #{variables.$mq-670} {
      height: 90px;
      width: 90px;
      box-shadow: 0px 5px 15px rgba(#000, 0.3);
    }
    @media #{variables.$mq-1200} {
      display: none;
    }
  }
</style>
