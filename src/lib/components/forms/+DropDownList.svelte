<script lang="ts">
  import type { ListItem } from "./types";
  import type { KeyboardAccessibility } from "$lib/generics/KeyboardAccessibility";

  export let value: ListItem;
  export let items: ListItem[];
  export let accessibility: KeyboardAccessibility;
  export let onSelect: (value: ListItem, index: number) => void;

  class UIController {
    public static select = (e: Event) => {
      e.preventDefault();
      if (!e.target) {
        return;
      }
      // @ts-ignore
      const { index } = e.target.dataset;
      onSelect(items[index], index);
    };
  }
</script>

<div class="navigable-list">
  <div bind:this={accessibility.dropdown}>
    {#each items as { value: val, label }, index}
      <button
        data-index={index}
        on:click={UIController.select}
        class:selected={val === value.value}
      >
        {label}
      </button>
    {/each}
    {#if !items.length}
      <div class="none">There are no available options</div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .navigable-list {
    max-height: 200px;
    width: 100%;
    min-height: 40px;
    background: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    & > div {
      width: 100%;
      & > button {
        outline: none;
        border: none;
        width: 100%;
        margin: 0;
        padding: 0;
        height: 40px;
        color: variables.$core;
        background-color: #fff;
        text-align: left;
        box-sizing: border-box;
        padding: 0 20px;
        &:not(:last-of-type) {
          border-bottom: 1px solid #e1e1e1;
        }
        &:focus-visible,
        &:hover {
          color: variables.$coreDark;
          background-color: rgba(variables.$core, 0.25);
        }
        &.selected {
          color: #fff;
          background: linear-gradient(to right, variables.$core, variables.$core2);
        }
      }
      & > .none {
        color: variables.$core;
        background-color: #fff;
        font-weight: 300;
        font-style: italic;
        height: 40px;
        @include variables.center;
      }
    }
  }
</style>
