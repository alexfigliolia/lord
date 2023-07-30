import { Factory } from "$lib/state/Factory";

export const dataPoint = Factory.createWritable("Graph Active Data Point", 0);
export const pointDate = Factory.createWritable("Graph Data Point Date", 0);
export const prevPoint = Factory.createWritable("Graph Previously Active Data Point", 0);
export const positionX = Factory.createWritable("Graph Hovering Position X", 0);
export const positionY = Factory.createWritable("Graph Hovering Position Y", 0);
export const flip = Factory.createWritable("Graph Label Flip State", false);
export const labelActive = Factory.createWritable("Graph Label Visible", false);
