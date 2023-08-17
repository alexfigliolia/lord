import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { propertiesByOrg } from "$lib/graphql/properties.gql";
import type { PropertiesByOrg, PropertiesByOrgVariables } from "$lib/schema/PropertiesByOrg";

export const load = async (request: ServerLoadEvent) => {
  const { team: id } = request.params;
  const GQL = new GraphQLRequest<PropertiesByOrg, PropertiesByOrgVariables>({
    query: propertiesByOrg,
    variables: {
      id: parseInt(id!),
    },
  });
  const results = await GQL.send(request.fetch);
  return { properties: results?.data.properties || [] };
};
