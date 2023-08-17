export type ErrorHandling = "all" | "first";

export interface GQLRequest<V extends Record<string, any>> {
  query: string;
  variables: V;
  errorHandling?: ErrorHandling;
}

export interface ErrorLocation {
  message: string;
  location: { column: number; line: number }[];
}
