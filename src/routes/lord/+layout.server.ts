import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationsByAffiliation } from "$lib/graphql/organizations.gql";
import type { OrganizationsPayload } from "$lib/types/derived";
import type { CoreLayoutData } from "$lib/types/loaders";

export const load = verifyCredentials<CoreLayoutData>({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: async (user, request) => {
    const organization = new GraphQLRequest({
      query: organizationsByAffiliation,
      variables: {
        user_id: user.id,
      },
    });
    const results = await organization.send(request.fetch);
    const data = (await results.json()) as OrganizationsPayload;
    const organizations = data?.data?.organizationAffiliations || [];
    return { user, organizations };
  },
});
