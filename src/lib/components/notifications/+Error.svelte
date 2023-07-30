<script lang="ts">
  import X from "$lib/icons/+X.svelte";
  import ActionStatus from "./+ActionStatus.svelte";

  export let ID: string;
  export let index: number;
  export let message: string = "";

  let hide: () => void;
  export const hideNotification = () => {
    hide();
  };
</script>

<ActionStatus
  {ID}
  {index}
  {message}
  title="Whoops"
  bind:hideNotification={hide}
  background="linear-gradient(to right, rgb(234, 84, 84), rgb(183, 50, 50))"
>
  <X color="#fff" />
</ActionStatus>
