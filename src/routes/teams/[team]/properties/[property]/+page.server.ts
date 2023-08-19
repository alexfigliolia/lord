import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { queryPropertyByID } from "$lib/graphql/properties.gql";
import type { PropertyByID, PropertyByIDVariables } from "$lib/schema/PropertyByID";

export const load = async (request: ServerLoadEvent) => {
  const { property: id } = request.params;
  const PropertyQuery = new GraphQLRequest<PropertyByID, PropertyByIDVariables>({
    query: queryPropertyByID,
    variables: {
      id: parseInt(id!),
    },
  });
  const property = await PropertyQuery.send(request.fetch);
  return {
    property: property.data.property,
  };
};
