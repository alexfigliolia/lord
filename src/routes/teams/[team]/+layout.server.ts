import { redirect, type ServerLoadEvent } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationByID } from "$lib/graphql/organizations.gql";
import type { OrganizationByID, OrganizationByIDVariables } from "$lib/schema/OrganizationByID";
import type { OverviewData } from "$lib/views/overview/types";

export const load = async (request: ServerLoadEvent): Promise<OverviewData> => {
  const { team: id } = request.params;
  const GQL = new GraphQLRequest<OrganizationByID, OrganizationByIDVariables>({
    query: organizationByID,
    variables: {
      id: parseInt(id!),
    },
  });
  try {
    const results = await GQL.send(request.fetch);
    const org = results.data.organization;
    const { properties, users, issues, expenses, payments, ...organization } = org;
    return { properties, users, issues, expenses, payments, organization };
  } catch (error) {
    console.log(error);
    // TODO - error handle other routes
    throw redirect(301, "/teams");
  }
};
