import type { CoreLayoutData } from "$lib/core-layout/types";
import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { UserPaymentMethodsQuery } from "$lib/graphql/user-payment-methods.gql";
import type {
  userPaymentMethods,
  userPaymentMethodsVariables,
} from "$lib/schema/userPaymentMethods";
import type { ResidenceData } from "$lib/views/residence/types";
import { type ServerLoadEvent } from "@sveltejs/kit";

export const load = async (
  request: ServerLoadEvent,
): Promise<Pick<ResidenceData, "payment_methods" | "residence">> => {
  const { residence: id = "-1" } = request.params;
  const data = (await request.parent()) as CoreLayoutData;
  const residence = data.residencies.find(v => v.id === parseInt(id))!;
  const GQL = new GraphQLRequest<userPaymentMethods, userPaymentMethodsVariables>({
    query: UserPaymentMethodsQuery,
    variables: {
      user_id: data.user.id,
    },
  });
  const response = await GQL.send(request.fetch);
  return {
    payment_methods: response.data.userPaymentMethods,
    residence,
  };
};
