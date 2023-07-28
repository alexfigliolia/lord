<script lang="ts">
  import AnimatedNumber from "./+AnimatedNumber.svelte";

  export let title: string;
  export let value: string;
  export let change: string;
  export let positive: boolean;
  export let subtitle: string = "";
  export let delay: number = 500;
  export let duration: number = 1.5;
</script>

<div class="status">
  <div class="label">{title}</div>
  <div class="stats">
    <AnimatedNumber
      active
      {value}
      {delay}
      {duration}
      height="1.5em"
      fontSize="2em"
      style={`     
        color: #9e91fc;  
        margin: 2.5px 0;
        font-weight: 300;
        letter-spacing: -1px;
        text-shadow: 0px 1px 2px rgba(0,0,0, 0.2);
    `} />
    <div class="change" class:positive class:negative={!positive}>
      {positive ? "+" : "-"}{change}
    </div>
  </div>
  {#if subtitle}
    <div class="label">{subtitle}</div>
  {/if}
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
    flex-direction: column;
    & > .label {
      color: variables.$lightgrey;
      font-size: 0.75em;
      font-weight: 700;
      width: 100%;
    }
    & > .stats {
      width: 100%;
      @include variables.center;
      align-self: flex-start;
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
          background-color: rgb(255, 172, 172);
          color: rgb(224, 63, 63);
        }
      }
    }
  }
</style>
