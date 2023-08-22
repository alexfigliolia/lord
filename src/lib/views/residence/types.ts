import type { CoreLayoutData } from "$lib/core-layout/types";
import type { Residencies_residencies } from "$lib/schema/Residencies";
import type { userPaymentMethods_userPaymentMethods } from "$lib/schema/userPaymentMethods";

export interface ResidenceData extends CoreLayoutData {
  payment_methods: userPaymentMethods_userPaymentMethods;
  residence: Residencies_residencies;
}
