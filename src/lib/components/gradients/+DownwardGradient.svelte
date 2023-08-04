<script lang="ts">
  export let id: string;
  export let color1: string = "#9284fc";
  export let color2: string = "rgb(145, 189, 252)";
</script>

<defs>
  <linearGradient {id} x1="0" x2="1" y1="0" y2="1">
    <stop stop-color={color1} offset="0" />
    <stop stop-color={color2} offset="1" />
  </linearGradient>
</defs>
