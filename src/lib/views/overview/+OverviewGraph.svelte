<script>
  import moment from "moment";
  import { writable } from "svelte/store";
  import AreaGraph from "$lib/components/data-viz/+AreaGraph.svelte";
  import Label from "./+Label.svelte";
  import DisplayTile from "$lib/components/tiles/+DisplayTile.svelte";

  const dataPoint = writable(0);
  const pointDate = writable(0);
  const prevPoint = writable(0);
  const positionX = writable(0);
  const positionY = writable(0);
  const flip = writable(false);
  const labelActive = writable(false);

  const xData = new Array(12).fill("").map((_, i) => {
    const date = moment();
    date.subtract(12 - i, "months");
    date.hours(0);
    return date.toDate().getTime();
  });
  const yData = new Array(12).fill(0).map(() => {
    return Math.floor(Math.random() * (20000 - 10000) + 10000);
  });
</script>

<DisplayTile title="Overview" subtitle="All Properties">
  <AreaGraph
    {flip}
    {xData}
    {yData}
    {dataPoint}
    {pointDate}
    {prevPoint}
    {positionX}
    {positionY}
    {labelActive}
  />
</DisplayTile>

<Label {flip} {dataPoint} {pointDate} {prevPoint} {positionX} {positionY} {labelActive} />
