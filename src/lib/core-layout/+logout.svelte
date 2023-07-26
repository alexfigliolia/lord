<button class="logout">Logout</button>

<style lang="scss">
  @use "$lib/variables";
  .logout {
    margin: 30px 0;
    padding: 0;
    background-color: #fff;
    text-transform: uppercase;
    width: 90%;
    max-width: 300px;
    border: none;
    border-radius: 2.5px;
    font-weight: 500;
    height: 45px;
    color: variables.$core;
    box-shadow: 0px 5px 7.5px rgba(#000, 0.2);
    transform: skewX(-5deg);
  }
</style>
