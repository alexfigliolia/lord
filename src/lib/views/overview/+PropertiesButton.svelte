<script lang="ts">
  import { browser } from "$app/environment";
  import { onMount } from "svelte";

  let location: string = "";

  onMount(() => {
    if (browser) {
      location = window.location.pathname;
    }
  });
</script>

<a href={`${location}/properties`}>Properties</a>

<style lang="scss">
  @use "$lib/variables.scss";

  a {
    color: #fff;
    text-shadow: none;
    text-decoration: none;
    border-radius: 0px;
    font-size: 0.8em;
    background: linear-gradient(to bottom, variables.$core, variables.$core2);
    position: relative;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 7.5px 15px;
    border-radius: 3px;
    transition-duration: 0.3s;
    &:hover {
      box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
    }
  }
</style>
