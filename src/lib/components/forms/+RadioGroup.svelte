<script lang="ts">
  export let value: string;
  export let legend: string;
  export let onChange: (e: Event) => void;
  export let inputs: { name: string; label: string }[];
</script>

<fieldset class="radio-group">
  {#if !!legend}
    <legend>{legend}</legend>
  {/if}
  {#each inputs as input}
    <div class="container">
      <div class="radio" class:selected={value === input.name}>
        <input
          type="radio"
          id={input.name}
          name={input.name}
          value={input.name}
          checked={value === input.name}
          on:change={onChange}
        />
        <div class="overlay" />
      </div>
      <label for={input.name}>{input.label}</label>
    </div>
  {/each}
</fieldset>

<style lang="scss">
  @use "$lib/variables";
  .radio-group {
    width: 100%;
    border: none;
    outline: none;
    padding: 0;
    & > legend {
      font-weight: 500;
      color: rgb(77, 77, 77);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0;
      font-size: 1.75em;
      font-weight: 400;
      color: rgb(155, 152, 158);
      margin-bottom: 10px;
    }
    & > .container {
      @include variables.center;
      width: 100%;
      justify-content: flex-start;
      margin-bottom: 10px;
      & > .radio {
        height: 30px;
        position: relative;
        width: 30px;
        border-radius: 50%;
        background-color: transparent;
        border: 2px solid variables.$core;
        @include variables.center;
        cursor: pointer;
        margin-bottom: 0;
        & > input {
          opacity: 0;
          outline: none;
          border: none;
          height: 30px;
          width: 30px;
          background-color: transparent;
          cursor: pointer;
          margin-bottom: 0;
        }
        & > .overlay {
          position: absolute;
          top: 5px;
          left: 5px;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background-color: variables.$core;
          box-shadow: 0px 0px 7.5px rgba(variables.$core, 0.5);
          transform: scale(0);
          transition-duration: 0.3s;
          cursor: pointer;
        }
        &.selected > .overlay {
          transform: scale(1);
        }
      }
      & > label {
        margin-left: 10px;
        cursor: pointer;
        margin-bottom: 0;
      }
    }
  }
</style>
