import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/GraphQLRequest";
import { organizationsByOwner } from "$lib/graphql/organizations.gql";
import type { OrganizationsPayload } from "$lib/types/derived";

export const load = verifyCredentials<OrganizationsPayload>({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: async (user, request) => {
    const organization = new GraphQLRequest({
      query: organizationsByOwner,
      variables: {
        owner_id: user.id,
        follow_all: true,
      },
    });
    const results = await organization.send(request.fetch);
    const data = (await results.json()) as OrganizationsPayload;
    return data;
  },
});
