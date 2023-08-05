import type { Organization as GQLOrg, Property as GQLProp, Issue as GQLIssue, Unit as GQLUnit, Invite as GQLInvite, User as GQLUser } from "./index";
import type { Payload } from "./utilies";

export type PartialOrganization = Pick<GQLOrg, "id" | "name">;

export type Organization = Omit<GQLOrg, "__typename" | "owner_id">;

export type OrganizationsPayload = Payload<{
	organizationAffiliations: PartialOrganization[]
}>


export type OrganizationPayload = Payload<{
	organization: Organization
}>


export type User = Omit<GQLUser, "__typename" | "password">

export type AuthPayload = Payload<{
	user: User
}>

export type OrganizationUsersPayload = Payload<{
	organizationsUsers: User[]
}>

export type Property = Omit<GQLProp, "__typename">;

export type CreatePropertyPayload = Payload<{
	createProperty: Property
}>

export type PropertyPayload = Payload<{
	property: Property
}>

export type Issue = Omit<GQLIssue, "__typename">

export type CreateIssuePayload = Payload<{
	createIssue: Issue
}>

export type Unit = Omit<GQLUnit, "__typename">

export interface AssignedUser {
	id: number;
	name: string
}

export type Invite = Omit<GQLInvite, "__typename">

export type CreateInvitePayload = Payload<{
	createInvite: Invite
}>

export type FindInvitationsPayload = Payload<{
	invites: Invite[]
}>

export type PropertyOverview = Omit<GQLProp, "images" | "issues" | "expenses" | "units">

export type PropertiesPayload = Payload<{
	properties: PropertyOverview[]
}>