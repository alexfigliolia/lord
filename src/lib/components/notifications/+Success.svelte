<script lang="ts">
  import Check from "$lib/icons/+Check.svelte";
  import ActionStatus from "./+ActionStatus.svelte";

  export let ID: string;
  export let index: number;
  export let message: string = "";

  let hide: () => void;
  export const hideNotification = () => {
    hide();
  };
</script>

<ActionStatus title="Success!" {message} {ID} {index} bind:hideNotification={hide}>
  <Check color="#fff" />
</ActionStatus>
