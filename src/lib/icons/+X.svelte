<script lang="ts">
  export let color: string = "#000";
</script>

<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {color}>
  <path
    d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243"
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
