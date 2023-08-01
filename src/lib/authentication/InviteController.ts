import { GraphQLRequest } from "$lib/graphql/GraphQLRequest";
import { acceptInvite, findInvitesByEmail } from "$lib/graphql/invites.gql";
import type { AuthPayload, FindInvitationsPayload, Invite } from "$lib/types/derived";
import { SignUpController } from "$lib/authentication/SignUpController";

export class InviteController extends SignUpController {
  public async findInvites(): Promise<FindInvitationsPayload> {
    const request = new GraphQLRequest({
      query: findInvitesByEmail,
      variables: {
        email: this.email,
      },
    });
    const result = await request.send();
    return result.json();
  }

  public async acceptInvite(invite: Invite): Promise<AuthPayload> {
    const request = new GraphQLRequest({
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
    const response = await request.send();
    return response.json();
  }

  public validateAll() {
    return this.validateName() && this.validateEmail() && this.validatePassword();
  }
}
