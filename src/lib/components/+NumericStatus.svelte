<script lang="ts">
  export let title: string;
  export let value: string;
  export let change: string;
  export let positive: boolean;
  export let subtitle: string = "";
</script>

<div class="status">
  <div class="labels">
    <div class="label">{title}</div>
    <div class="value">{value}</div>
    {#if subtitle}
      <div class="label">{subtitle}</div>
    {/if}
  </div>
  <div class="change" class:positive class:negative={!positive}>
    {positive ? "+" : "-"}{change}
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .status {
    border-radius: 10px;
    padding: 12.5px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    & > .labels {
      display: flex;
      flex-direction: column;
      margin-right: 10px;
      & > .label {
        color: variables.$lightgrey;
        font-size: 0.75em;
        font-weight: 700;
      }
      & > .value {
        font-weight: 700;
        font-size: 2em;
        margin: 5px 0;
        text-shadow: 0px 1px 1px rgba(#000, 0.1);
        background: linear-gradient(to bottom, variables.$core, variables.$core2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
    & > .change {
      padding: 5px 10px;
      border-radius: 100px;
      font-size: 1em;
      @include variables.center;
      margin-left: 10px;
      box-shadow: 0px 2.5px 5px rgba(#000, 0.2);
      &.positive {
        background-color: rgb(143, 227, 143);
        color: rgb(20, 166, 69);
      }
      &.negative {
        background-color: rgb(239, 121, 121);
        color: rgb(244, 83, 83);
      }
    }
  }
</style>
