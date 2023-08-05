<script lang="ts">
  import AnimatedNumber from "./+AnimatedNumber.svelte";

  export let value: string;
  export let label: string;
  export let fontSize: string = "25px";
</script>

<div class="container">
  <div class="value">
    <AnimatedNumber active {fontSize} {value} style="justify-content: flex-end;" />
  </div>
  <div class="subtext">{label}</div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .container {
    & > .value {
      font-weight: 300;
      color: variables.$core;
      letter-spacing: -0.05px;
      text-shadow: 0px 0.25px 0.5px rgba(0, 0, 0, 0.2);
    }
    & > .subtext {
      width: 100%;
      text-align: right;
      font-size: 0.75em;
      font-weight: 700;
      color: rgb(181, 178, 184);
    }
  }
</style>
