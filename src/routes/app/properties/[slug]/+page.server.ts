import { redirect } from "@sveltejs/kit";
import { verifyCredentials } from "$lib/authentication/verifyCredentials";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import type { Property } from "$lib/types/derived";
import { queryPropertyByID } from "$lib/graphql/properties.gql";

export const load = verifyCredentials<{ activeProperty: Property }>({
  onError: () => {
    throw redirect(302, "/login");
  },
  onSuccess: async (_, request) => {
    const { slug: id } = request.params;
    if (id === undefined) {
      throw redirect(302, "/app/properties");
    }
    const GQL = new GraphQLRequest({
      query: queryPropertyByID,
      variables: {
        id: parseInt(id),
      },
    });
    const response = await GQL.send(request.fetch);
    const data = await response.json();
    if (!data.data.property) {
      throw redirect(302, "/app/properties");
    }
    return { activeProperty: data.data.property };
  },
});
