import type { ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { queryPropertyByID } from "$lib/graphql/properties.gql";
import { queryUsersByOrgID } from "$lib/graphql/organizations.gql";
import type { PropertyByID, PropertyByIDVariables } from "$lib/schema/PropertyByID";
import type {
  OrganizationsUsers,
  OrganizationsUsersVariables,
} from "$lib/schema/OrganizationsUsers";

export const load = async (request: ServerLoadEvent) => {
  const { property: id, team: orgID } = request.params;
  const PropertyQuery = new GraphQLRequest<PropertyByID, PropertyByIDVariables>({
    query: queryPropertyByID,
    variables: {
      id: parseInt(id!),
    },
  });
  const UsersQuery = new GraphQLRequest<OrganizationsUsers, OrganizationsUsersVariables>({
    query: queryUsersByOrgID,
    variables: {
      id: parseInt(orgID!),
    },
  });
  const [users, property] = await Promise.all([
    UsersQuery.send(request.fetch),
    PropertyQuery.send(request.fetch),
  ]);
  return {
    users: users.data.organizationsUsers,
    property: property.data.property,
  };
};
