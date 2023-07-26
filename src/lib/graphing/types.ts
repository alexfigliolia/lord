export interface Margin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

export interface IGraph<T extends Record<string, any>[]> {
  data: T;
  width: number;
  height: number;
  margin?: Margin;
}

export interface Coordinate {
  x: number;
  y: number;
}
