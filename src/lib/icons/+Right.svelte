<script lang="ts">
  export let color: string = "#000";
</script>

<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M4 14a2 2 0 110-4 2 2 0 010 4zM9 12h13m0 0l-3-3m3 3l-3 3"
    stroke={color}
    stroke-width="1"
    fill="transparent"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>

<style lang="scss">
  svg {
    width: 100%;
    height: 100%;
    & > path {
      transition: stroke 0.3s;
    }
  }
</style>
