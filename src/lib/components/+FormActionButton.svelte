<script lang="ts">
  export let text: string;
  export let onSubmit: (e: Event) => void;
</script>

<button class="form-action" on:click={onSubmit}>{text}</button>

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
    width: 100%;
    margin-top: 20px;
    margin-bottom: 20px;
    color: #fff;
    text-transform: uppercase;
    font-weight: 700;
    transition-duration: 0.3s;
    box-shadow: 0px 5px 10px rgba(variables.$core, 0.95);
    &:hover,
    &:focus {
      box-shadow: 0px 10px 20px rgba(variables.$core, 0.95);
      transform: scale(1.025);
    }
  }
</style>
