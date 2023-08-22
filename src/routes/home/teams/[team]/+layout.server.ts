import { redirect } from "@sveltejs/kit";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { organizationByID } from "$lib/graphql/organizations.gql";
import type { OrganizationByID, OrganizationByIDVariables } from "$lib/schema/OrganizationByID";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";

export const load = verifyCredentials({
  onSuccess: async (user, request) => {
    const { team: id } = request.params;
    const GQL = new GraphQLRequest<OrganizationByID, OrganizationByIDVariables>({
      query: organizationByID,
      variables: {
        id: parseInt(id!),
        user_id: user.id,
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
      throw redirect(301, "/home");
    }
  },
});
