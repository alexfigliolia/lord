<script lang="ts">
  import Check from "$lib/icons/+Check.svelte";
  import X from "$lib/icons/+X.svelte";
  import { Factory } from "$lib/state/Factory";

  export let name: string;
  export let type: string;
  export let placeholder: string = "";
  export let autocomplete: string = name;
  export let onChange: (e: Event) => void;
  export let validator: (value: string) => null | boolean;

  const value = Factory.createWritable(`${name} =  Value`, "");
  const valid = Factory.createDerived(`${name} =  Valid`, value, v => validator(v));

  const internal = (e: Event) => {
    if (e.target) {
      // @ts-ignore
      const nextValue = e.target.value;
      value.set(nextValue);
      onChange(e);
    }
  };
</script>

<div class="input">
  <input {type} {name} {placeholder} {autocomplete} on:change={internal} />
  <div
    class="status"
    class:success={!!$valid}
    class:error={$valid === false}
    class:visible={$valid !== null}
  >
    {#if $valid === true}
      <Check color="#fff" />
    {/if}
    {#if $valid === false}
      <X color="#fff" />
    {/if}
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .input {
    width: 100%;
    background-color: transparent;
    margin-bottom: 20px;
    border-radius: 20px;
    position: relative;
    & > input,
    &:-webkit-autofill {
      background-color: variables.$core;
      border: none;
      height: 40px;
      border-radius: 20px;
      width: 100%;
      margin: 0;
      padding: 0 5px 0 15px;
      box-sizing: border-box;
      outline: none;
      transition-duration: 0.3s;
      color: #fff;
      font-weight: 700;
      &:focus,
      &:hover {
        box-shadow: 0px 5px 10px rgba(variables.$core, 0.75);
      }
      &::placeholder {
        font-style: italic;
        text-transform: capitalize;
        color: #eeeeee;
        font-weight: 400;
      }
    }
    & > .status {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      height: 25px;
      width: 25px;
      top: 7.5px;
      right: 7.5px;
      border-radius: 50%;
      box-sizing: border-box;
      transition-duration: 0.4s;
      background-color: variables.$core;
      box-shadow: 0px 2.5px 5px rgba(variables.$core, 0.5);
      &.visible {
        opacity: 1;
      }
      &.error {
        background-color: rgb(226, 90, 90);
        box-shadow: 0px 2.5px 5px rgba(226, 90, 90, 0.5);
      }
      &.success {
        background-color: rgb(66, 195, 115);
        box-shadow: 0px 2.5px 5px rgba(66, 195, 115, 0.5);
      }
    }
  }
</style>
