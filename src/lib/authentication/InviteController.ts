import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { acceptInvite, findInvitesByEmail } from "$lib/graphql/invites.gql";
import { SignUpController } from "$lib/authentication/SignUpController";
import type {
  FindInvitations,
  FindInvitationsVariables,
  FindInvitations_invites,
} from "$lib/schema/FindInvitations";
import type { AcceptInvite, AcceptInviteVariables } from "$lib/schema/AcceptInvite";

export class InviteController extends SignUpController {
  public async findInvites() {
    const request = new GraphQLRequest<FindInvitations, FindInvitationsVariables>({
      query: findInvitesByEmail,
      variables: {
        email: this.email,
      },
    });
    return request.send();
  }

  public async acceptInvite(invite: FindInvitations_invites) {
    const request = new GraphQLRequest<AcceptInvite, AcceptInviteVariables>({
      query: acceptInvite,
      variables: {
        name: this.username,
        email: this.email,
        password: this.password,
        invite_id: invite.id,
        organization_id: invite.organization_id,
        role: invite.role,
      },
    });
    return request.send();
  }

  public validateAll() {
    return this.validateName() && this.validateEmail() && this.validatePassword();
  }
}
