<script lang="ts">
  import type { User } from "$lib/authentication/types";
  import DropDownList from "$lib/components/forms/+DropDownList.svelte";
  import { KeyboardAccessibility } from "$lib/generics/KeyboardAccessibility";
  import Account from "$lib/icons/+Account.svelte";
  import type { Maybe } from "$lib/types";
  import { users } from "$lib/state/User";
  import { onMount } from "svelte";
  import { derived } from "svelte/store";
  import { GraphQLRequest } from "$lib/GraphQLRequest";
  import type { ListItem } from "$lib/components/forms/types";
  import { assignIssueMutation } from "$lib/graphql/issues.gql";
  import { OrganizationState } from "$lib/state/OrgManager";

  export let id: number;
  export let index: number;
  export let assigned: Maybe<User> | undefined;

  const userList = derived(users, v => v.map(u => ({ value: u.id, label: u.name })));
  let open = false;

  class UIController {
    static open = () => {
      open = true;
      Accessibility.onVisible();
    };

    static close = () => {
      open = false;
      Accessibility.onInvisible();
    };

    public static onSelect = ({ value }: ListItem) => {
      let nextID = typeof value === "string" ? null : value;
      if (nextID === assigned?.id) {
        nextID = null;
      }
      const request = new GraphQLRequest({
        query: assignIssueMutation,
        variables: {
          issue_id: id,
          user_id: nextID,
        },
      });
      void request.send();
      OrganizationState.updateIssueAssignment(nextID, index);
    };

    public static currentValue(assigned: Maybe<User> | undefined) {
      return { value: assigned?.id || "", label: assigned?.name || "" };
    }
  }

  const Accessibility = new KeyboardAccessibility(UIController.close);

  onMount(() => {
    return () => {
      Accessibility.onInvisible();
    };
  });
</script>

<div class="actions">
  <div class="assignment" bind:this={Accessibility.container}>
    <button class="assignment" on:click={UIController.open}>
      <Account stroke="#fff" fill={assigned?.name ? "url(#acg)" : "#ddd"}>
        <defs>
          <linearGradient id="acg" x1="0" x2="1" y1="0" y2="1">
            <stop stop-color="#9284fc" offset="0" />
            <stop stop-color="rgb(145, 189, 252)" offset="1" />
          </linearGradient>
        </defs>
      </Account>
    </button>
    <div class="dropdown" class:open>
      {#if !assigned}
        <div class="unassigned">Unassigned</div>
      {/if}
      <DropDownList
        items={$userList}
        accessibility={Accessibility}
        onSelect={UIController.onSelect}
        value={UIController.currentValue(assigned)}
      />
    </div>
  </div>
</div>

<style lang="scss">
  @use "$lib/variables";
  .actions {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5%;
    & > .assignment {
      position: relative;
      & > button {
        padding: 0;
        margin: 0;
        background-color: transparent;
        border: none;
        height: 30px;
        width: 30px;
        box-sizing: border-box;
        border-radius: 50%;
        box-shadow: 0px 1px 3.5px rgba(#000, 0.2);
        &:focus-within {
          outline: 2px solid variables.$core;
        }
      }
      & > .dropdown {
        text-wrap: wrap;
        max-width: 200px;
        position: absolute;
        bottom: calc(100% + 10px);
        right: 0px;
        border-radius: 5px;
        z-index: 5;
        font-size: 0.9em;
        min-width: 130px;
        overflow: hidden;
        box-shadow: 0px 2.5px 7.5px rgba(#000, 0.3);
        visibility: hidden;
        opacity: 0;
        transform: translateY(-10px);
        transition: transform 0.25s, opacity 0.25s, visibility 0s 0.25s;
        &.open {
          visibility: visible;
          opacity: 1;
          transform: translateY(0px);
          transition: transform 0.25s, opacity 0.25s, visibility 0s 0s;
        }
        & > .unassigned {
          height: 40px;
          width: 100%;
          color: #d0d0d0;
          font-style: italic;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #ebebeb;
        }
      }
    }
  }
</style>
