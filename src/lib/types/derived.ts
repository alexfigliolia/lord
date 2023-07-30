import type { Organization as GQLOrg, Property as GQLProp } from "./index";

export type Organization = Omit<GQLOrg, "__typename" | "owner_id">;

export interface OrganizationsPayload {
	errors?: Record<string, any>[]
	data: {
		organizations: Organization[]
	}
}

export type Property = Omit<GQLProp, "__typename">;

export interface CreatePropertyPayload {
	errors?: Record<string, any>[]
	data: {
		createProperty: Property
	}
}