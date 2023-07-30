import type { Organization as GQLOrg, Property as GQLProp } from "./index";

export type Organization = Omit<GQLOrg, "__typename" | "owner_id">;

export type Property = Omit<GQLProp, "__typename">;

export interface OrganizationsPayload {
	errors?: Record<string, any>[]
	data: {
		organizations: Organization[]
	}
}