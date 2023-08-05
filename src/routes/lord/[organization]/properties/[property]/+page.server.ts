import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import type { OrganizationUsersPayload, PropertyPayload } from "$lib/types/derived";
import { queryPropertyByID } from "$lib/graphql/properties.gql";
import { queryUsersByOrgID } from "$lib/graphql/organizations.gql";

export const load = async (request: ServerLoadEvent) => {
  const { property: id, organization: orgID } = request.params;
  const PropertyQuery = new GraphQLRequest({
    query: queryPropertyByID,
    variables: {
      id: parseInt(id!),
    },
  });
  const UsersQuery = new GraphQLRequest({
    query: queryUsersByOrgID,
    variables: {
      id: parseInt(orgID!),
    },
  });
  const [property, users] = await Promise.all([
    PropertyQuery.send(request.fetch).then(res => res.json()) as Promise<PropertyPayload>,
    UsersQuery.send(request.fetch).then(res => res.json()) as Promise<OrganizationUsersPayload>,
  ]);
  return {
    users: users.data.organizationsUsers,
    property: property?.data?.property,
  };
};
