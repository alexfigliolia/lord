import { GraphQLClient } from "graphql-request";
import { PUBLIC_SERVICE_URL } from "$env/static/public";
import type { ErrorHandling, GQLRequest } from "./types";

export class GraphQLRequest<D, V extends Record<string, any> = Record<string, any>> {
  variables: V;
  query: string;
  errorHandling: ErrorHandling;
  signal = new AbortController();
  constructor({ query, variables, errorHandling = "first" }: GQLRequest<V>) {
    this.query = query;
    this.variables = variables;
    this.errorHandling = errorHandling;
  }

  public async send(request: typeof fetch = fetch) {
    const client = new GraphQLClient(`${PUBLIC_SERVICE_URL}/graphql`, {
      mode: "cors",
      fetch: request,
      method: "POST",
      errorPolicy: "all",
      credentials: "include",
      signal: this.signal.signal,
    });
    try {
      const response = await client.rawRequest<D>(this.query, this.variables);
      return response;
    } catch (error: any) {
      if (this.errorHandling === "first" && error?.response?.errors?.length) {
        throw new Error(error.response.errors[0].message);
      }
      throw error;
    }
  }

  public abort() {
    this.signal.abort();
  }
}
