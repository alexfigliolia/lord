import type { Organization as GQLOrg } from "./index";

export type Organization = Omit<GQLOrg, "__typename" | "owner_id">;

export interface OrganizationsPayload {
	errors?: Record<string, any>[]
	data: {
		organizations: Organization[]
	}
}