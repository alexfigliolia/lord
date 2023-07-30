<script lang="ts">
  import X from "$lib/icons/+X.svelte";
  import Circle from "../loaders/+Circle.svelte";
  import Check from "$lib/icons/+Check.svelte";

  export let text: string;
  export let error: boolean = false;
  export let loading: boolean = false;
  export let complete: boolean = false;
  export let stateful: boolean = false;
  export let onSubmit: (e: Event) => void = () => {};
</script>

<button class="form-action" class:loading class:complete class:error on:click={onSubmit}>
  {text}
  {#if stateful}
    <div class="loader">
      <Circle />
    </div>
    <div class="check">
      <Check color="#fff" />
    </div>
    <div class="x">
      <X color="#fff" />
    </div>
  {/if}
</button>

<style lang="scss">
  @use "$lib/variables.scss";
  .form-action {
    background-color: variables.$core;
    border-radius: 25px;
    outline: none;
    border: none;
    margin: 0;
    padding: 0;
    height: 50px;
    user-select: none;
    width: 100%;
    margin: 20px auto;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    transition: transform 0.3s 0s, box-shadow 0.3s 0s, width 0.5s 0s, color 0.2s 0.2s;
    box-shadow: 0px 5px 10px rgba(variables.$core, 0.95);
    position: relative;
    &:hover,
    &:focus {
      box-shadow: 0px 10px 20px rgba(variables.$core, 0.95);
      transform: scale(1.025);
    }
    & > .loader,
    & > .check,
    & > .x {
      height: 30px;
      width: auto;
      transition-duration: 0.3s;
      transition-delay: 0s;
      pointer-events: none;
      position: absolute;
      top: 10px;
      width: 40px;
      left: calc(50% - 20px);
      transform: scale(0);
      opacity: 0;
    }
    & > .x,
    & > .check {
      height: 35px;
      top: 7.5px;
    }
    &.loading {
      color: transparent;
      pointer-events: none;
      width: 50px;
      transition: transform 0.3s 0s, box-shadow 0.3s 0s, width 0.5s 0s, color 0.2s 0s;
      & > .loader {
        transform: scale(1);
        opacity: 1;
        transition-delay: 0.3s;
      }
      &.complete {
        & > .loader {
          transform: scale(0);
          opacity: 0;
          transition-delay: 0s;
        }
        & > .check {
          transform: scale(1);
          opacity: 1;
          transition-delay: 0.3s;
        }
      }
      &.error {
        & > .loader {
          transform: scale(0);
          opacity: 0;
          transition-delay: 0s;
        }
        & > .x {
          transform: scale(1);
          opacity: 1;
          transition-delay: 0.3s;
        }
      }
    }
  }
</style>
