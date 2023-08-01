import type { RequestEvent } from "@sveltejs/kit";
import type { IVerifyCredentials, User } from "./types";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { verifyQuery } from "$lib/graphql/authentication.gql";

export const verifyCredentials = <T = User>({
  onError = () => {},
  onSuccess = (user: User, _: RequestEvent<any>) => user as T,
}: IVerifyCredentials<T>) => {
  return async (params: RequestEvent) => {
    const user = params.cookies.get("L_User");
    if (!user) {
      return onError();
    }
    const request = new GraphQLRequest({
      query: verifyQuery,
    });
    const response = await request.send(params.fetch);
    const body = await response.json();
    if (body.data.verifyToken === null || body?.errors?.length) {
      return onError();
    }
    return onSuccess(body.data.verifyToken.user, params);
  };
};
