import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationsByOwner } from "$lib/graphql/organizations.gql";
import type { Organization, OrganizationsPayload } from "$lib/types/derived";
import type { User } from "$lib/authentication/types";

export const load = verifyCredentials<{ organizations: Organization[]; user: User }>({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: async (user, request) => {
    const organization = new GraphQLRequest({
      query: organizationsByOwner,
      variables: {
        owner_id: user.id,
      },
    });
    const results = await organization.send(request.fetch);
    const data = (await results.json()) as OrganizationsPayload;
    return { user, organizations: data?.data?.organizations || [] };
  },
});
