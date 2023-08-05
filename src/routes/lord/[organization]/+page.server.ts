import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationByID } from "$lib/graphql/organizations.gql";
import type { OrganizationPayload } from "$lib/types/derived";

export const load = async (request: ServerLoadEvent) => {
  const { organization: id } = request.params;
  const GQL = new GraphQLRequest({
    query: organizationByID,
    variables: {
      id: parseInt(id!),
    },
  });
  const results = await GQL.send(request.fetch);
  const data = (await results.json()) as OrganizationPayload;
  const org = data?.data?.organization;
  const { properties, users, issues, ...organization } = org;
  return { properties, users, issues, organization };
};
