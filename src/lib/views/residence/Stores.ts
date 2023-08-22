import type { Residencies_residencies } from "$lib/schema/Residencies";
import type { userPaymentMethods_userPaymentMethods } from "$lib/schema/userPaymentMethods";
import { Factory } from "$lib/state/Factory";

export const residence = Factory.createWritable<Residencies_residencies | undefined>("Residence");

export const paymentMethods = Factory.createWritable<userPaymentMethods_userPaymentMethods>(
  "Payment Methods",
  {
    payment_methods: [],
    linked_bank_accounts: [],
    __typename: "UserPaymentMethods",
  },
);
