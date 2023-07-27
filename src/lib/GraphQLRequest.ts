import { browser } from "$app/environment";
import { PUBLIC_SERVICE_URL } from "$env/static/public";

export class GraphQLRequest {
  query: string;
  variables: Record<string, any>;
  signal = new AbortController();
  constructor({ query, variables = {} }: { query: string; variables?: Record<string, any> }) {
    this.query = query;
    this.variables = variables;
  }

  public send(fetchFunc: typeof fetch = fetch, headers: Record<string, any> = {}) {
    const URL = browser ? "/graphql" : `${PUBLIC_SERVICE_URL}/graphql`;
    return fetchFunc(URL, {
      method: "POST",
      mode: "cors",
      signal: this.signal.signal,
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
        ...headers,
      },
      body: JSON.stringify({
        query: this.query,
        variables: this.variables,
      }),
    });
  }

  public abort() {
    this.signal.abort();
  }
}
