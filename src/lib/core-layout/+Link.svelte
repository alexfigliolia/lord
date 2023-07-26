<script lang="ts">
  export let label: string;
  export let href: string;
  export let color: string;
</script>

<div class="link">
  <a {href} style={`color: ${color}`}>
    <slot />
    <span>{label}</span>
  </a>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .link {
    text-align: left;
    cursor: pointer;
    margin: 40px 0;
    font-weight: 500;
    font-size: 1.1em;
    & > a {
      @include variables.center;
      justify-content: flex-start;
      text-decoration: none;
      & > span {
        margin-left: 5px;
        pointer-events: none;
      }
      & > svg {
        height: auto;
        width: auto;
        height: 1.25em;
        width: 1.25em;
        pointer-events: none;
      }
    }
  }
</style>
