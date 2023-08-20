import type { ServerLoadEvent } from "@sveltejs/kit";
import type { OrganizationByID_organization_properties } from "$lib/schema/OrganizationByID";

export const load = async ({ fetch, params, parent }: ServerLoadEvent) => {
  const { property: id } = params;
  const { properties } = await parent();
  const ID = parseInt(id!);
  return {
    activeProperty: (properties as OrganizationByID_organization_properties[]).find(
      p => p.id === ID,
    ),
  };
};
