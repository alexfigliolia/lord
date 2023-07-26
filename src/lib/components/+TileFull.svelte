<script lang="ts">
  export let title: string;
</script>

<div class="tile">
  <div class="title">{title}</div>
  <div class="content">
    <div>
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .tile {
    width: 100%;
    & > .title {
      color: rgb(129, 129, 129);
      font-size: 1.5em;
      margin: 10px 0;
      font-weight: 600;
      text-shadow: 0px 1.5px 3px rgba(#000, 0.2);
    }
    & > .content {
      box-sizing: border-box;
      width: 100%;
      height: auto;
      padding: 2%;
      min-height: 100px;
      border-radius: 10px;
      background-color: #fff;
      box-shadow: 0px 5px 15px rgba(#000, 0.2);
      & > div {
        width: 100%;
        height: 100%;
        position: relative;
      }
    }
  }
</style>
