import type { RequestEvent } from "@sveltejs/kit";
import type { IVerifyCredentials, User } from "./types";
import { GraphQLRequest } from "$lib/GraphQLRequest";
import { CurrentUser } from "$lib/state/User";
import { publicUserFragment } from "$lib/graphql/user";

export const verifyCredentials = ({
  onError = () => {},
  onSuccess = (user: User, request: RequestEvent) => user,
}: IVerifyCredentials) => {
  return async (params: RequestEvent) => {
    const user = params.cookies.get("L_User");
    if (!user) {
      return onError();
    }
    const request = new GraphQLRequest({
      query: `
        query Verify {
          verifyToken {
            ${publicUserFragment}
          }
        }
      `,
    });
    const response = await request.send(params.fetch);
    const body = await response.json();
    if (body.data.verifyToken === null || body?.errors?.length) {
      return onError();
    }
    CurrentUser.set(body.data.verifyToken);
    return onSuccess(body.data.verifyToken, params);
  };
};
