<a id="coreLogo" href="/">Lord</a>

<style lang="scss">
  @use "$lib/variables.scss";
  #coreLogo {
    outline: none;
    border: none;
    background-color: transparent;
    color: variables.$core;
    font-weight: 600;
    font-size: 2.5em;
    letter-spacing: -0.05em;
    margin: 0;
    padding: 0;
    height: auto;
    width: auto;
    text-shadow: 0px 1px 1px rgba(#000, 0.1);
    background: linear-gradient(to bottom, variables.$core, variables.$core2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    @media #{variables.$mq-670} {
      font-size: 3em;
    }
    @media #{variables.$mq-1200} {
      font-size: 3.5em;
      font-weight: 700;
    }
  }
</style>
