<script lang="ts">
  export let color: string = "#fff";
</script>

<svg viewBox="25 25 50 50">
  <circle
    cx="50"
    cy="50"
    r="20"
    fill="none"
    stroke-width="2"
    stroke-miterlimit="10"
    stroke={color}
  />
  <slot />
</svg>

<style lang="scss">
  @keyframes loading-spinner-rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes loading-spinner-dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }
  svg {
    animation: loading-spinner-rotate 1.28973s linear infinite;
    height: 100%;
    width: 100%;
    transform-origin: center center;
    & > circle {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
      animation: loading-spinner-dash 2s ease-in-out infinite;
      stroke-linecap: round;
      stroke-width: 4px;
    }
  }
</style>
