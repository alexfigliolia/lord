<div class="content">
  <div>
    <slot />
  </div>
</div>

<style lang="scss">
  .content {
    box-sizing: border-box;
    width: 100%;
    height: auto;
    padding: 2vw;
    min-height: 40px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 5px 15px rgba(#000, 0.2);
    & > div {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
</style>
