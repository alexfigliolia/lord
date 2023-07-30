<script lang="ts">
  export let tabs: string[];
  export let activeIndex: number;
  export let onClick: (e: Event, index: number) => void;

  const onTabClick = (index: number) => {
    return (e: Event) => {
      onClick(e, index);
    };
  };
</script>

<div class="tab-content">
  <div class="tabs">
    <div class="slide" style={`transform: translateX(${activeIndex * 100}%);`} />
    {#each tabs as tab, index}
      <button class:active={activeIndex === index} on:click={onTabClick(index)}>{tab}</button>
    {/each}
  </div>
  <div class="content">
    <slot />
  </div>
</div>

<style lang="scss">
  @use "$lib/variables.scss";
  .tab-content {
    width: 100%;
    & > .tabs {
      width: 100%;
      display: flex;
      flex-direction: row;
      height: 40px;
      position: relative;
      & > .slide {
        width: 33.33333%;
        height: 7px;
        border-radius: 3.5px;
        background: linear-gradient(to right, variables.$core, variables.$core2);
        position: absolute;
        top: 100%;
        left: 0;
        transition-duration: 0.5s;
      }
      & > button {
        border: none;
        margin: 0;
        padding: 0;
        width: 100%;
        font-weight: 300;
        font-size: 1.25em;
        background-color: #fff;
        text-shadow: 0px 1px 1px rgba(#000, 0.1);
        background: linear-gradient(to right, variables.$core, variables.$core2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        &:focus-visible {
          outline: variables.$core solid 1px;
        }
      }
    }
    & > .content {
      width: 100%;
      margin-bottom: 50px;
    }
  }
</style>
