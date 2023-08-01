<script lang="ts">
  import { goto } from "$app/navigation";
  import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
  import { logoutQuery } from "$lib/graphql/authentication.gql";

  export let margin: string = "30px 0";
  export let textColor: string = "#9e91fc";
  export let backgroundColor: string = "#fff";
  export let onClick: () => void = () => {};

  const logout = async () => {
    onClick();
    const request = new GraphQLRequest({
      query: logoutQuery,
    });
    await request.send();
    return goto("/login");
  };
</script>

<button
  class="logout"
  on:click={logout}
  style={`background-color: ${backgroundColor}; color: ${textColor}; margin: ${margin}`}
  >Logout</button
>

<style lang="scss">
  @use "$lib/variables";
  .logout {
    padding: 0;
    background-color: #fff;
    text-transform: uppercase;
    width: 100%;
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
