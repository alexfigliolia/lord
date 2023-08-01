import type { Organization as GQLOrg, Property as GQLProp, Issue as GQLIssue, Unit as GQLUnit, Invite as GQLInvite, User as GQLUser } from "./index";

export type Organization = Omit<GQLOrg, "__typename" | "owner_id">;

export interface OrganizationsPayload {
	errors?: Record<string, any>[]
	data: {
		organizations: Organization[]
	}
}

export type User = Omit<GQLUser, "__typename">

export interface AuthPayload {
	errors: Record<string, any>[],
	data: {
		user: User
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

export interface AssignedUser {
	id: number;
	name: string
}

export type Invite = Omit<GQLInvite, "__typename">

export interface CreateInvitePayload {
	errors?: Record<string, any>[]
	data: {
		createInvite: Invite
	}
}

export interface FindInvitationsPayload {
	errors: Record<string, any>[];
	data: {
		invites: Invite[]
	}
}