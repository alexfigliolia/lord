import type { Organization as GQLOrg, Property as GQLProp, Issue as GQLIssue, Unit as GQLUnit } from "./index";

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

export type Issue = Omit<GQLIssue, "__typename">

export interface CreateIssuePayload {
	errors?: Record<string, any>[]
	data: {
		createIssue: Issue
	}
}

export type Unit = Omit<GQLUnit, "__typename">