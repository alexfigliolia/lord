<script lang="ts">
  import Check from "$lib/icons/+Check.svelte";
  import { onMount } from "svelte";
  import DropDownList from "./+DropDownList.svelte";
  import type { ListItem } from "./types";
  import { KeyboardAccessibility } from "$lib/generics/UX/KeyboardAccessibility";
  import { derived, writable } from "svelte/store";

  export let name: string;
  export let value: ListItem;
  export let items: ListItem[];
  export let placeholder: string = "";
  export let autocomplete: string = name;
  export let onSelect: (item: ListItem, index: number) => void = () => {};

  let open = false;

  const search = writable("");
  const listItems = writable(items);
  const displayValue = writable("");
  const inputValue = derived([search, displayValue], ([s, d]) => {
    return s.length ? s : d;
  });

  class UIController {
    public static open = () => {
      open = true;
      Accessibility.onVisible();
      displayValue.set("");
    };

    public static close = () => {
      open = false;
      Accessibility.onInvisible();
      this.onSelectOrClose();
    };

    static updateListItems(nextValue: string) {
      const caseInsensitive = nextValue.toLowerCase();
      if (nextValue === "") {
        listItems.set(items);
      } else {
        listItems.set(items.filter(item => item.label.toLowerCase().includes(caseInsensitive)));
      }
    }

    public static search = (e: Event) => {
      // @ts-ignore
      const { value: nextValue } = e.target;
      search.set(nextValue);
      displayValue.set("");
      this.updateListItems(nextValue);
    };

    public static select = (nextValue: ListItem, index: number) => {
      if (value.value === nextValue.value) {
        value = { value: "", label: "" };
        this.onSelectOrClose();
      } else {
        value = nextValue;
        this.close();
      }
      onSelect(value, index);
    };

    public static onSelectOrClose() {
      search.set("");
      displayValue.set(value.label);
      this.updateListItems("");
    }
  }

  const Accessibility = new KeyboardAccessibility(UIController.close);

  onMount(() => {
    return () => {
      Accessibility.onInvisible();
    };
  });
</script>

<div class="input" bind:this={Accessibility.container}>
  <input
    type="text"
    {name}
    {placeholder}
    {autocomplete}
    value={$inputValue}
    on:focus={UIController.open}
    on:input={UIController.search}
  />
  <div class="status" class:success={value.value !== ""} class:visible={value.value !== ""}>
    {#if value.value !== ""}
      <Check color="#fff" />
    {/if}
  </div>
  <div class="dropdown" class:open>
    <DropDownList
      {value}
      items={$listItems}
      accessibility={Accessibility}
      onSelect={UIController.select}
    />
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
      &.success {
        background-color: rgb(66, 195, 115);
        box-shadow: 0px 2.5px 5px rgba(66, 195, 115, 0.5);
      }
    }
    & > .dropdown {
      position: absolute;
      top: calc(100% + 5px);
      left: 0;
      width: 100%;
      z-index: 10;
      border-radius: 5px;
      box-shadow: 0px 2.5px 10px rgba(#000, 0.35);
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transform: translateY(10px);
      transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
      &.open {
        visibility: visible;
        opacity: 1;
        transform: translateY(0px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
      }
    }
  }
</style>
