import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationByID } from "$lib/graphql/organizations.gql";
import type { OrganizationByID, OrganizationByIDVariables } from "$lib/schema/OrganizationByID";

export const load = async (request: ServerLoadEvent) => {
  const { team: id } = request.params;
  const GQL = new GraphQLRequest<OrganizationByID, OrganizationByIDVariables>({
    query: organizationByID,
    variables: {
      id: parseInt(id!),
    },
  });
  const results = await GQL.send(request.fetch);
  const org = results.data.organization;
  const { properties, users, issues, ...organization } = org;
  return { properties, users, issues, organization };
};
