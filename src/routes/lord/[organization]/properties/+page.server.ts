import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import type { PropertiesPayload } from "$lib/types/derived";
import { propertiesByOrg } from "$lib/graphql/properties.gql";

export const load = async (request: ServerLoadEvent) => {
  const { organization: id } = request.params;
  const GQL = new GraphQLRequest({
    query: propertiesByOrg,
    variables: {
      id: parseInt(id!),
    },
  });
  const results = await GQL.send(request.fetch);
  const data = (await results.json()) as PropertiesPayload;
  return { properties: data?.data?.properties || [] };
};
