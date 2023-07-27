<script lang="ts">
  export let color: string = "#000";
</script>

<svg
  width="24px"
  height="24px"
  stroke-width="1.5"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {color}
>
  <path
    d="M5 13l4 4L19 7"
    stroke={color}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style lang="scss">
  svg {
    height: 100%;
    width: 100%;
  }
</style>
