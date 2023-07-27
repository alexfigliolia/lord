<script lang="ts">
  export let color: string = "#000";
</script>

<svg stroke-width="1.5" viewBox="0 0 24 24" fill="none" {color}>
  <path
    d="M10 9.01l.01-.011M14 9.01l.01-.011M10 13.01l.01-.011M14 13.01l.01-.011M10 17.01l.01-.011M14 17.01l.01-.011M6 20.4V5.6a.6.6 0 01.6-.6H12V3.6a.6.6 0 01.6-.6h4.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H6.6a.6.6 0 01-.6-.6z"
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
