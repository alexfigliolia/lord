import type { PartialOrganization, User } from "./derived";

export interface CoreLayoutData {
	user: User;
	organizations: PartialOrganization[];
}