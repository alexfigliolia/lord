<script lang="ts">
  export let color: string = "#fff";
</script>

<svg
  version="1.1"
  x="0px"
  y="0px"
  viewBox="-192 356.8 182.9 80.4"
  style="enable-background:new -192 356.8 182.9 80.4;"
>
  <path
    stroke={color}
    d="M-102,398c4-8.3,12.9-19.8,19-24.3c6.1-4.5,11.2-7.5,15.4-9c4.2-1.5,8.7-2.2,13.6-2.3c10.3,0,18.7,3.5,25,10.4
c6.4,6.8,9.6,15.1,9.6,24.9c0,6.7-1.4,12.8-4.3,18.5c-2.8,5.7-6.9,10-12.1,12.9c-5.2,2.9-11.1,4.4-17.9,4.4c-8.8,0-16.4-1.9-23-5.6
C-83.1,424.1-96.2,409.8-102,398c-5.1,11.6-19.5,26.5-25.9,30.1c-6.4,3.6-13.9,5.4-22.4,5.4c-10.8,0-19.3-3.4-25.4-10.1
c-6-6.7-9-15.3-9-25.6c0-9.7,3.2-18,9.5-24.9c6.4-6.9,14.8-10.4,25.1-10.4c5,0,9.6,0.8,13.8,2.3c4.2,1.5,9.2,4.5,15.3,9
C-114.9,378.2-105.9,390.9-102,398"
  />
  <slot />
</svg>

<style lang="scss">
  @keyframes load {
    from {
      stroke-dashoffset: 800;
    }
  }
  svg {
    height: 100%;
    width: auto;
    & > path {
      stroke-width: 6;
      stroke-linejoin: round;
      stroke-linecap: round;
      stroke-dasharray: 100px;
      fill: none;
      animation: load 4s linear infinite;
    }
  }
</style>
