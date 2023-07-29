<script lang="ts">
  import Error from "$lib/components/notifications/+Error.svelte";
  import Success from "$lib/components/notifications/+Success.svelte";
  import { NotificationState, notifications } from "$lib/state/Notifications";
  import { onMount } from "svelte";

  onMount(() => {
    return () => {
      NotificationState.clearAll();
    };
  });
</script>

<div class="notification-list">
  {#each $notifications as [ID, notification], index (ID)}
    {#if notification.type === "success"}
      <Success {ID} message={notification.message} {index} />
    {/if}
    {#if notification.type === "error"}
      <Error {ID} message={notification.message} {index} />
    {/if}
  {/each}
</div>

<style lang="scss">
  .notification-list {
    z-index: 10001;
    position: fixed;
    top: 15px;
    right: 15px;
    width: calc(100% - 30px);
    max-width: 400px;
  }
</style>
