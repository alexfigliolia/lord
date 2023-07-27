<script lang="ts">
  export let color: string = "#000";
</script>

<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M20 20H4V4"
    stroke={color}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M4 16.5L12 9l3 3 4.5-4.5"
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
