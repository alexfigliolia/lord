import type { OrganizationStats, User } from "./derived";

export interface CoreLayoutData {
	user: User;
	organizations: OrganizationStats[];
}