<script lang="ts">
  export let color: string = "#000";
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6 12h6m6 0h-6m0 0V6m0 6v6"
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
    & path {
      transition-duration: 0.3s;
    }
  }
</style>
