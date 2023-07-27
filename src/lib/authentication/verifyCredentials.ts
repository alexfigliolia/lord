import type { RequestEvent } from "@sveltejs/kit";
import type { IVerifyCredentials, User } from "./types";
import { GraphQLRequest } from "$lib/GraphQLRequest";

export const verifyCredentials = ({
  onError = () => {},
  onSuccess = (user: User) => user,
}: IVerifyCredentials) => {
  return async ({ cookies, fetch, route }: RequestEvent) => {
    const user = cookies.get("L_User");
    if (!user) {
      return onError();
    }
    const request = new GraphQLRequest({
      query: `
					query Verify {
						verifyToken {
							user {
								id
							}
						}
					}
				`,
    });
    const response = await request.send(fetch);
    const body = await response.json();
    if (body.data.verifyToken === null || body?.errors?.length) {
      return onError();
    }
    return onSuccess(body.data.verifyToken);
  };
};
