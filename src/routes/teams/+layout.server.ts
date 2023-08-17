import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationsByAffiliation } from "$lib/graphql/organizations.gql";
import type {
  OrganizationsByAffiliation,
  OrganizationsByAffiliationVariables,
} from "$lib/schema/OrganizationsByAffiliation";
import type { CoreLayoutData } from "$lib/core-layout/types";

export const load = verifyCredentials<CoreLayoutData>({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: async (user, request) => {
    const organization = new GraphQLRequest<
      OrganizationsByAffiliation,
      OrganizationsByAffiliationVariables
    >({
      query: organizationsByAffiliation,
      variables: {
        user_id: user.id,
      },
    });
    const results = await organization.send(request.fetch);
    const organizations = results?.data?.organizationStats || [];
    return { user, organizations };
  },
});
