import { gql } from "graphql-request";

export const ResidencyQuery = gql`
  query Residencies($user_id: Int!) {
    residencies(user_id: $user_id) {
      id
      amount
      start_date
      end_date
      organization_id
      property {
        id
        name
      }
      unit {
        id
        name
      }
      payments {
        id
        amount
      }
    }
  }
`;
