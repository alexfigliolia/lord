<script lang="ts">
  export let color: string = "#000";
</script>

<svg viewBox="0 0 25 25" stroke-width="1.5" fill="none" {color}>
  <path
    d="M10.634 11.056L2.148 19.54l2.122 2.121 8.485-8.485"
    stroke={color}
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  /><path
    d="M10.634 11.056l1.414-1.415s.354-3.182-3.182-6.717l1.06-1.06 8.486 5.656-1.06 1.06 1.413 1.415 1.061-1.06 2.475 2.474-4.95 4.95-2.475-2.475 1.061-1.06-1.414-1.415-1.768 1.768-2.121-2.121z"
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
