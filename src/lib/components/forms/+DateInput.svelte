<script lang="ts">
  import { onMount } from "svelte";
  import { Calendar } from "@figliolia/svelte-calendar";
  import Check from "$lib/icons/+Check.svelte";
  import X from "$lib/icons/+X.svelte";
  import { derived, writable } from "svelte/store";
  import { KeyboardAccessibility } from "$lib/generics/UX/KeyboardAccessibility";
  import { Locale } from "$lib/generics/UX/Locale";
  import { Validators } from "$lib/add-forms/Validators";

  export let name: string;
  export let value: string;
  export let placeholder: string = "";
  export let autocomplete: string = name;

  let open = false;

  const internalValue = writable(value);
  const valid = derived(internalValue, v => Validators.dateValidator(v));

  const onSelect = (year: number, month: number, day: number) => {
    value = new Date(year, month, day).toLocaleDateString(Locale.get(), {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  class UIController {
    public static open = () => {
      open = true;
      Accessibility.onVisible();
    };

    public static close = () => {
      open = false;
      Accessibility.onInvisible();
    };

    public static onKeyDown = (e: KeyboardEvent) => {
      if (e.which === 9 || e.key === "Tab" || e.which === 27 || e.key === "Escape") {
        return;
      }
      e.preventDefault();
    };
  }

  const Accessibility = new KeyboardAccessibility(UIController.close);

  onMount(() => {
    return () => {
      Accessibility.onInvisible();
    };
  });

  $: value, internalValue.set(value);
</script>

<div class="input" bind:this={Accessibility.container}>
  <input
    type="text"
    {name}
    bind:value
    {placeholder}
    {autocomplete}
    on:focus={UIController.open}
    on:keydown={UIController.onKeyDown}
  />
  <div
    class="status"
    class:error={$valid === false}
    class:success={$valid === true}
    class:visible={$valid !== null}
  >
    {#if $valid === true}
      <Check color="#fff" />
    {/if}
    {#if $valid === false}
      <X color="#fff" />
    {/if}
  </div>
  <div class="calendar" class:open aria-hidden={!open}>
    <div class="triangle" />
    <Calendar {onSelect} buttonBGActive="#9e91fc" buttonLabelColor="rgb(116, 107, 127)" />
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
    & > input {
      background-color: rgb(230, 230, 230);
      border: none;
      height: 40px;
      border-radius: 20px;
      width: 100%;
      margin: 0;
      padding: 0 5px 0 15px;
      box-sizing: border-box;
      outline: none;
      transition-duration: 0.3s;
      color: rgb(75, 75, 75);
      font-weight: 500;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      &:focus {
        color: #fff;
        background-color: rgb(245, 245, 245);
        background-color: variables.$core;
        box-shadow: 0px 5px 10px rgba(variables.$core, 0.75);
        &::placeholder {
          color: rgb(246, 246, 246);
        }
      }
      &::placeholder {
        font-style: italic;
        text-transform: capitalize;
        color: rgb(116, 116, 116);
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
    & > .calendar {
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      z-index: 2;
      pointer-events: none;
      background-color: #fff;
      padding: 10px;
      box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      visibility: hidden;
      opacity: 0;
      transform: translateY(10px);
      transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
      &.open {
        visibility: visible;
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
      }
      & > .triangle {
        position: absolute;
        bottom: 100%;
        left: 20px;
        width: 20px;
        height: 20px;
        overflow: hidden;
        &::after {
          content: "";
          position: absolute;
          width: 10px;
          height: 10px;
          background: #fff;
          transform: rotate(45deg);
          top: 15px;
          left: 2.5px;
          box-shadow: -1px -1px 3px 0px rgba(#000, 0.1);
        }
      }
    }
  }
</style>
