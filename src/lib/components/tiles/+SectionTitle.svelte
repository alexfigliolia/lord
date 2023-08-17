<div class="title">
  <slot />
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .title {
    display: flex;
    justify-content: space-between;
    color: variables.$grey;
    font-size: 1.25em;
    margin: 20px 0 10px 0;
    font-weight: 400;
    text-shadow: 0px 1.5px 3px rgba(#000, 0.2);
  }
</style>
