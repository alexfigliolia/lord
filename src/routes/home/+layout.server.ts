import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationsByAffiliation } from "$lib/graphql/organizations.gql";
import type {
  OrganizationsByAffiliation,
  OrganizationsByAffiliationVariables,
} from "$lib/schema/OrganizationsByAffiliation";
import type { CoreLayoutData } from "$lib/core-layout/types";
import { ResidencyQuery } from "$lib/graphql/residency.gql";
import type { Residencies, ResidenciesVariables } from "$lib/schema/Residencies";

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
    const residency = new GraphQLRequest<Residencies, ResidenciesVariables>({
      query: ResidencyQuery,
      variables: {
        user_id: user.id,
      },
    });
    const [org, res] = await Promise.all([
      organization.send(request.fetch),
      residency.send(request.fetch),
    ]);
    const organizations = org?.data?.organizationStats || [];
    const residencies = res?.data?.residencies || [];
    return { user, organizations, residencies };
  },
});
