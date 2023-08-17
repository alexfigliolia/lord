<script lang="ts">
  import { page } from "$app/stores";
  import { derived } from "svelte/store";

  export let href: string;
  export let color: string;
  export let label: string;
  export let margin: string = "40px 0";
  export let activeColor: string = color;
  export let onClick: (e: Event) => void = () => {};

  const active = derived(page, v => (v.route.id || "/").includes(href));
  const currentColor = derived(active, v => (v ? activeColor : color));
</script>

<div class="link" class:active={$active} style={`margin: ${margin}`}>
  <div class="underline" style={`background-color: ${$currentColor}`} />
  <a {href} style={`color: ${$currentColor}`} on:click={onClick}>
    <div class="icon">
      <slot currentColor={$currentColor} />
    </div>
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
    position: relative;
    & > .underline {
      pointer-events: none;
      position: absolute;
      bottom: -40%;
      left: 0;
      transform-origin: 50% 50%;
      width: 100%;
      height: 3px;
      transform: scaleX(0);
      pointer-events: none;
      transition-duration: 0.3s;
    }
    &:hover > .underline,
    &.active > .underline {
      transform: scaleX(1);
    }
    & > a {
      @include variables.center;
      justify-content: flex-start;
      text-decoration: none;
      font-size: 1.1em;
      transition-duration: 0.3s;
      & > .icon {
        height: 25px;
        width: 25px;
      }
      & > span {
        margin-left: 5px;
        pointer-events: none;
      }
    }
  }
</style>
