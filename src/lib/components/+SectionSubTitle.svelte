<script lang="ts">
  export let text: string = "";
</script>

<div class="section-title">{text}</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .section-title {
    font-size: 1.25em;
    color: variables.$darkgrey;
    font-weight: 700;
  }
</style>
