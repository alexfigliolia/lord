<script lang="ts">
  export let fill: string = "#fff";
  export let stroke: string = "#000";
</script>

<svg stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"
    {stroke}
    {fill}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 100-6 3 3 0 000 6z"
    {stroke}
    {fill}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <slot />
</svg>

<style lang="scss">
  svg {
    height: 100%;
    width: 100%;
    & path {
      transition-duration: 0.3s;
    }
  }
</style>
