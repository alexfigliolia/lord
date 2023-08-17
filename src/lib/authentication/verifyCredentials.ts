import type { GraphQLClientResponse } from "graphql-request/build/esm/types";
import type { ServerLoadEvent } from "@sveltejs/kit";
import type { IVerifyCredentials } from "./types";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { verifyQuery } from "$lib/graphql/authentication.gql";
import type { UserFragment } from "$lib/schema/UserFragment";
import type { Verify } from "$lib/schema/Verify";

export const verifyCredentials = <T = UserFragment>({
  onError = () => {},
  onSuccess = (user: UserFragment, _: ServerLoadEvent<any>) => user as T,
}: IVerifyCredentials<T>) => {
  return async (params: ServerLoadEvent) => {
    const user = params.cookies.get("L_User");
    if (!user) {
      return onError();
    }
    const request = new GraphQLRequest<Verify>({
      query: verifyQuery,
      variables: {},
    });
    let result: GraphQLClientResponse<Verify>;
    try {
      result = await request.send(params.fetch);
    } catch (error: any) {
      return onError();
    }
    return onSuccess(result.data.verifyToken.user, params);
  };
};
