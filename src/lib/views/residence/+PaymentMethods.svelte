<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";
  import { browser } from "$app/environment";
  import type { default as Flickity } from "flickity";
  import CreditCard from "$lib/components/+CreditCard.svelte";
  import { Payments } from "./Payments";
  import { paymentMethods } from "./Stores";
  import "flickity/css/flickity.css";

  const allMethods = derived(paymentMethods, v => {
    return [...v.payment_methods, ...v.linked_bank_accounts];
  });

  const activeIndex = writable(0);

  class UIController {
    static carousel: HTMLDivElement;
    static Instance: Flickity;

    public static async init() {
      const flickity = (await import("flickity")).default;
      this.Instance = new flickity(this.carousel, {
        cellAlign: "center",
        pageDots: false,
        adaptiveHeight: true,
      });
      this.Instance.on("change", index => {
        activeIndex.set(index);
      });
    }

    public static destroy() {
      if (this.Instance) {
        this.Instance.destroy();
      }
    }
  }

  onMount(() => {
    if (browser && UIController.carousel) {
      void UIController.init();
    }
    return () => {
      UIController.destroy();
    };
  });
</script>

<div class="items" bind:this={UIController.carousel}>
  {#each $allMethods as card, i}
    <div class="entry">
      <div class="entry-content" class:active={$activeIndex === i}>
        <div class="card">
          <CreditCard color={Payments.cardColor(card.name)} />
        </div>
        <div class="meta">
          <div class="info">
            <strong>Name: </strong>
            {card.name}
          </div>
          {#if "expiration" in card}
            <div class="info">
              <strong>Exp: </strong>
              {card.expiration}
            </div>
          {/if}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .items {
    width: 100%;
    max-height: 300px;
    overflow: hidden;
    & .entry {
      width: 70%;
      @include variables.center;
      box-sizing: border-box;
      & > .entry-content {
        width: 100%;
        @include variables.center;
        flex-direction: column;
        transform: scale(0.9);
        opacity: 0.4;
        transition-duration: 0.3s;
        & > .card {
          width: 92.5%;
        }
        & > .meta {
          width: 80%;
          margin-top: 20px;
          & > .info {
            width: 100%;
            color: rgb(128, 128, 128);
            margin-bottom: 5px;
            & > strong {
              color: rgb(113 104 125);
            }
          }
        }
        &.active {
          transform: scale(0.95);
          opacity: 1;
        }
      }
    }
  }
  :global(.flickity-button.flickity-prev-next-button) {
    background-color: transparent;
    box-shadow: none;
    &:focus {
      box-shadow: none;
    }
    &:active {
      opacity: 1;
    }
  }
  :global(.flickity-button.flickity-prev-next-button.previous) {
    left: 0;
    top: 40%;
  }
  :global(.flickity-button.flickity-prev-next-button.next) {
    right: 0;
    top: 40%;
  }
  :global(.flickity-button.flickity-prev-next-button > svg > path) {
    fill: variables.$darkgrey;
  }
  :global(.flickity-viewport) {
    transition: height 0.2s;
  }
</style>
